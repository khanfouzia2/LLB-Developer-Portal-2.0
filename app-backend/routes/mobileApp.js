const express = require('express');
const router = express.Router();
const { MobileApp } = require('../database/models.js');
const authentication = require('../services/authentication.js');
const multer = require('multer')
const unzip = require('unzip');
const fs = require('fs');

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
      //This will create new app in DB
      const payload = req.body;
      let mobileApp = await MobileApp.create({
        ...payload,
        user_id: req.user.id,
        // The data send through FormData from the backend is a String not an prober array , hence we need to do some splitting
        permissions: payload.permissions.split(',')
      });
      if (req.file != null) {
        //Now we unzip the file to correct folder and delete the upload .zip file
        UnZipAndDeleteZipFile(req.file, mobileApp.id);
      }

      return res.status(201).send();
    }
    catch (e) {
      console.log(`Error while trying to create an app. error = ${e}`);
      if(req.file != null) {
        if (fs.existsSync(req.file.path)) {
          console.log("file upload but insert fail so just gonna remove the file now");
          fs.unlinkSync(req.file.path);
        }
      }
      res.status(500).send();
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