const express = require('express');
const router = express.Router();
const { MobileApp, MobileAppQuestionair, MobileAppQuestionairChoice, sequelize } = require('../database/models.js');
const authentication = require('../services/authentication.js');
const multer = require('multer')
const unzip = require('unzip');
const fs = require('fs');

let transaction;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `apps`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')


router.get('/', authentication, async function (req, res) {
  try {
    let mobileApps = await MobileApp.findAll(
      {
        where:
        {
          user_id: req.user.id,
        }
      });
    return res.status(200).send({ mobileApps: mobileApps });
  }
  catch (e) {
    console.log(`Error while trying to get a list of mobile app. error = ${e}`);
    res.status(500).send();
  }
});

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

//Helper method
const UnZipAndDeleteZipFile = (zipFile, appId) => {
  const appFolder = `./apps/${appId}`
  //Folder for upload files related to mobileApp
  if (!fs.existsSync(appFolder)) {
    console.log("apps folder and application folder not found")
    fs.mkdirSync(appFolder);
    console.log("folders created")
  }
  fs.createReadStream(zipFile.path).pipe(unzip.Extract({ path: appFolder }));
  fs.unlinkSync(zipFile.path);
}

module.exports = router;