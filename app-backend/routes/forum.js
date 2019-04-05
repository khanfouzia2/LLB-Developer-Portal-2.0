const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const querystring = require('querystring');
const authentication = require('../services/authentication.js');

/*

  Routes for Forum

  Routes are:
  # GET /

*/





/*
  Get most recent Threads. Order: created_at ASC

  Todo:
    - Add limit, pagination?
    - Auth.?
*/
router.get('/', authentication, (req, res) => {

  // Hit the route
  console.log("\nGET forum / request received")
  console.log("AUTH: " + req.user.email)

  // Get ?page
  const limit = 25; // How many threads is loaded
  var page = req.query.page ? parseInt(req.query.page, 10) : 1;
  if(isNaN(page) || page <= 0) {
    page = 1;
  }
  const offset_ = (page-1)*limit;

  // Threads where deleted_at IS NULL,
  // and include User, token and password fields excluded
  const options = {
    where: {
      deleted_at: {
        [Sequelize.Op.eq]: null
      }
    },
    include: [{
        model: models.User,
        attributes: { exclude: models.secluded.user }
    }],
    order: [
      ['created_at', 'DESC']
    ],
    offset: offset_,
    limit: limit
  }

  // Make query
  prom = models.Thread.findAll(options);

  prom.then(data => {
    console.log(data)
    res.json(data); // Sends response as json
  }).catch(err => {
    //
    res.send();
    console.log("ERR: \n\n" + err);
  })

  //res.end();

});







module.exports = router;
