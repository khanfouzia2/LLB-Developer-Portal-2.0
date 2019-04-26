const express = require('express');
const router = express.Router();
const { MobileApp } = require('../database/models.js');
const authentication = require('../services/authentication.js');


router.get('/', authentication, async function (req, res) {
  try {
    let mobileApps = await MobileApp.findAll(
      {
        where:
        {
          user_id: req.user.id,
        }
      });
    return res.status(200).send({mobileApps:mobileApps});
  }
  catch (e) {
    console.log(`Error while trying to get a list of mobile app. error = ${e}`);
    res.status(500).send();
  }
});


module.exports = router;