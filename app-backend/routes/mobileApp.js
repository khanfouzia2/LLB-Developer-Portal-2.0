const express = require('express');
const router = express.Router();
const { MobileApp, MobileAppQuestionair, MobileAppQuestionairChoice, MobileAppQuestionairAnswer, sequelize } = require('../database/models.js');
const authentication = require('../services/authentication.js');
const multer = require('multer')
const unzip = require('unzip');
const fs = require('fs');
const { LoadFullMobileAppsByUserId, LoadFullSingleMobileAppsByAppId, } = require('../utils/mobileAppUtil')
const rimraf = require("rimraf");

let transaction;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `apps`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')


router.get('/', authentication, async function (req, res) {
  try {
    let mobileApps = await LoadFullMobileAppsByUserId(req.user.id);
    return res.status(200).send({ mobileApps: mobileApps });
  }
  catch (e) {
    console.log(`Error while trying to get a list of mobile app. error = ${e}`);
    res.status(500).send();
  }
});

router.put('/:id', authentication, function (req, res) {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new Error(err);
      }
      else if (err) {
        throw new Error(err);
      }

      transaction = await sequelize.transaction();
      const appId = req.params.id;
      const { questionairList, ...appInfo } = req.body;

      //First let's find mobile App record
      let foundedMobileApp = await LoadFullSingleMobileAppsByAppId(appId);

      if(foundedMobileApp != null) {
        if (req.file != null) {
          //Now we unzip the file to correct folder and delete the uploaded .zip file (IF user reupload the file again)
          UnZipAndDeleteZipFile(req.file, foundedMobileApp.id);
        }
        //Update general info here
        let MobileAppModel = await MobileApp.findOne({where: {id: appId}});
        MobileAppModel = Object.assign(MobileAppModel, {
                                       ...appInfo, 
                                       user_id: req.user.id,
                                       permissions: JSON.parse(appInfo.permissions)})

        MobileAppModel.save()

        //Process Question list
        let frontendQuestionairList = JSON.parse(questionairList);
        let dbQuestionairList = foundedMobileApp.questionairList;

        let newQuestionairList = frontendQuestionairList.filter(x => {
          let found = dbQuestionairList.filter(y => y.id == x.id);
          return (found.length == 0);
        });

        let removedQuestionairList = dbQuestionairList.filter( x => {
          let found = frontendQuestionairList.filter(y => y.id == x.id);
          return found.length == 0;
        });

        //here to handle obsolete the removed question
        for (question of removedQuestionairList) {
          let questionModel = await MobileAppQuestionair.findOne({where:{id: question.id}});
          questionModel.isObsolete = true;
          let obsoletedQuestion = await questionModel.save({transaction});
        }

        //here to create new question List and its of options
        for (question of newQuestionairList) {
          const { id, questionOptions, ...questionInfoToUpdate } = question;
          //Now handle create questionair list
          let createdQuestion = await MobileAppQuestionair.create({
            ...questionInfoToUpdate,
            app_id: foundedMobileApp.id,
          }, { transaction });
  
          //Now handle create options of the question
          for (option of questionOptions) {
            const { id, ...optionInfoToUpdate } = option;
            let createdOptions = await MobileAppQuestionairChoice.create({
              ...optionInfoToUpdate,
              question_id: createdQuestion.id
            }, {transaction});
          }
        }
  
        await transaction.commit();
        return res.status(200).send();
      }
      throw "Cannot find an app to update"
    }
    catch (e) {
      console.log(`Error while trying to create an app. error = ${e}`);
      if (req.file != null) {
        if (fs.existsSync(req.file.path)) {
          console.log("file upload but insert fail so just gonna remove the file now");
          fs.unlinkSync(req.file.path);
        }
      }
      await transaction.rollback();
      return res.status(500).send();
    }
  })
})


router.post('/', authentication, function (req, res) {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        throw new Error(err);
      }
      else if (err) {
        throw new Error(err);
      }

      transaction = await sequelize.transaction();

      const { questionairList, ...appInfo } = req.body;

      //First let's create mobile App record
      let createdMobileApp = await MobileApp.create({
        ...appInfo,
        user_id: req.user.id,
        permissions: JSON.parse(appInfo.permissions)
      }, { transaction });

      if (req.file != null) {
        //Now we unzip the file to correct folder and delete the uploaded .zip file
        UnZipAndDeleteZipFile(req.file, createdMobileApp.id);
      }

      let objectQuestionairList = JSON.parse(questionairList);

      for (question of objectQuestionairList) {
        const { id, questionOptions, ...questionInfoToUpdate } = question;
        //Now handle create questionair list
        let createdQuestion = await MobileAppQuestionair.create({
          ...questionInfoToUpdate,
          app_id: createdMobileApp.id,
        }, { transaction });

        //Now handle create options of the question
        for (option of questionOptions) {
          const { id, ...optionInfoToUpdate } = option;
          let createdOptions = await MobileAppQuestionairChoice.create({
            ...optionInfoToUpdate,
            question_id: createdQuestion.id
          }, {transaction});
        }
      }

      await transaction.commit();
      return res.status(201).send();
    }
    catch (e) {
      console.log(`Error while trying to create an app. error = ${e}`);
      if (req.file != null) {
        if (fs.existsSync(req.file.path)) {
          console.log("file upload but insert fail so just gonna remove the file now");
          fs.unlinkSync(req.file.path);
        }
      }
      await transaction.rollback();
      return res.status(500).send();
    }
  })
})


router.get('/export_answer/:appid', authentication, async function(req, res) {
  const appId = req.params.appid;
  let foundedMobileApp = await LoadFullSingleMobileAppsByAppId(appId);
  if(foundedMobileApp.user_id != req.user.id) {
    return res.status(401).send();
  }
  let questionsWithAnswer = await Promise.all(foundedMobileApp.questionairList.map (async question => {
      let answers = await MobileAppQuestionairAnswer.findAll({where: {question_id: question.id}});
      question.answers = answers;
      return question;
  }));
  return res.status(200).send(questionsWithAnswer);
})


//Helper method
const UnZipAndDeleteZipFile = (zipFile, appId) => {
  const appFolder = `./apps/${appId}`
  //Folder for upload files related to mobileApp
  if (!fs.existsSync(appFolder)) {
    console.log("apps folder and application folder not found")
    fs.mkdirSync(appFolder);
    console.log("folders created")
  }

  rimraf.sync(appFolder);

  fs.createReadStream(zipFile.path).pipe(unzip.Extract({ path: appFolder }));
  fs.unlinkSync(zipFile.path);
}

module.exports = router;