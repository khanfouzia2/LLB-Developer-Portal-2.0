const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const querystring = require('querystring');
const policies = require('../authorization/policies.js');
const authentication = require('../services/authentication.js');

// TODO: Add auth.


/*
  GET URL/feedback/
  Returns feedbacks, most recent first.

  Policy: Admin only

  Returns:
  - On success: (Json) Array of feedback objects with sub-object user
  200
  [
    {
        "id": 2,
        "title": "xxx",
        "description": "xxx",
        "type": "FEEDBACK",
        "author_id": 1000,
        "created_at": "2019-05-07T13:43:58.289Z",
        "user": {
            "id": 1000,
            "email": "admin@admin.com"
        }
    },

    401 If not authorized

    403 No permission

  Todo: add pagination


*/
router.get('/', authentication, (req, res) => {

  console.log("\n\tGET feedback");
  console.log("\tAUTH:" + req.user.email);

  // If NOT admin
  if(!policies.isAdmin(req.user)) {
    res.status(403).send(); return;
  }

  // Get query 'page' value. 1 by default.
  var page = parseInt(req.query.page, 10);
  if(!page || page <= 0) {
    page = 1;
  }

  const offset_ = (page-1) * config.FEEDBACK_LOAD_LIMIT; // Get feedbacks from [0..x] if page=1 and so on...

  const options = {
    attributes: ['id', 'title', 'description', 'type', 'author_id', 'created_at'], // SELECT ... -part
    include: [
      {
        model: models.User,
        attributes: ['id', 'first_name', 'last_name', 'email']
      }
    ],
    limit: config.FEEDBACK_LOAD_LIMIT,
    offset: offset_,
    order: Sequelize.literal('created_at DESC') // newest first
  }

  //
  var pr = models.BugFeedback.findAll(options);

  //
  pr.then(rows => {
    res.json(rows);
  }, (err) => {
    res.status(500).send();
  })


});








/*

    BODY:
    title
    description

*/
router.post('/', authentication, (req, res) => {

    console.log("POST feedback")
    console.log( "AUTH: " + req.user.email )
    console.log( req );

    if( !req.body.title || !req.body.description) {
      res.status(415).json({message: 'Content not valid!'}); return;
    }

    const title = req.body.title.trim();
    const desc = req.body.description.trim();

    if( title.lenght == 0 || desc.length == 0) {
      res.status(415).json({message: 'Content not valid!'}); return;
    }

    const user_id = req.user.id;

    // Insert to DB
    var pr = models.BugFeedback.create({
        title: title,
        description: desc,
        type: 'FEEDBACK',
        author_id: user_id,
    });

    pr.then(data => {
      //console.log(data);
      res.status(201).json(data);
    }, (err) => {
      console.log(err);
      res.status(500).json({message: err});
    });

});









module.exports = router;
