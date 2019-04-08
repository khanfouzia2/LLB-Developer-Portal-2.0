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

/*
  Gets Thread object and its comments and commnt's user obj.

  For ordering 'includes', see: http://docs.sequelizejs.com/manual/models-usage.html#ordering-eager-loaded-associations
*/
router.get('/thread/:id', authentication, (req, res) => {

  console.log("\n\nGET /thread/:id request received!")

  var id = parseInt(req.params.id, 10);

  prom = models.Thread.findByPk(id, {
    include: [ {
      model: models.Comment,
      where: {
        deleted_at: {
          [Sequelize.Op.eq]: null
        },
      },
      include: [
        {
          model: models.User,
          attributes: {
            exclude: models.secluded.user
          }
        }
      ],
      required:false
    }],
    order: [ [ models.Comment, 'created_at', 'ASC' ] ]
  });

  prom.then(data => {
    if(data == null) { throw new Error("Not found"); }
    res.json(data);
    console.log(id + data )
  }).catch(err => {
    res.status(404).send();
  });

  //res.end();

});


router.post('/', authentication, (req, res) => {

  console.log("\n\nPOST forum / call received");
  console.log("AUTH: " + req.user.email);
  console.log(req);

  // Permission check
  if(!req.user) { res.status(403).send() }

  var title = req.body.title;
  var cont = req.body.content;

  if(!title || !cont) { console.log("Invalid content"); res.status(415).send(); }

  // received data
  console.log("\t" + title);
  console.log("\t" + cont);

  title = title.substr(0,100).trim();
  cont = cont.substr(0,50000).trim();

  var insertPromise = models.Thread.create({
    title: title,
    content: cont,
    author_id: req.user.id
  });

  insertPromise.then(data => {
    console.log("\nInserted successfully. ID " + data.id );
    return data;

  }).then(data => {
    // Status 201 CREATED. Sets Content type json header
    res.status(201).json(data);

  }).catch(err => {
    console.log(err);
    res.status(500).send();
  })



});





module.exports = router;
