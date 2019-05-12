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
  //
  // Check permission / Policies
  var pol = policies.isAdmin(req.user);
  // If NOT admin
  if(!pol) {
    res.status(403).send(); // Forbidden aka No permission
    return;
  }

  // Get query 'page' value. 1 by default.
  var page = 1;
  if(req.query.page) {
    page = parseInt(req.query.page, 10);
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

    console.log( req );
    console.log( req.user )

    var title = req.body.title;
    var desc = req.body.description;

    if( title == null || desc == null || title.length == 0 || desc.length == 0) {
        res.status(415).json({message: 'Content not valid!'});
        return;
    }
    title = title.toString().trim();
    desc = desc.toString().trim();
    var author_id;
    if(req.user != null) {
        author_id = !isNaN(req.user.id) ? req.user.id : null;
    }

    // Insert to DB
    const fb = {
        title: title,
        description: desc,
        type: 'FEEDBACK',
        author_id: author_id,
    }

    var pr = models.BugFeedback.create(fb);
    pr.then(data => {
        //console.log(data);
        res.status(201).json(data);
    }, onError)


    var onError = function(err) {
        console.log(err);
        res.status(500).json({message: err});
    }

});









module.exports = router;
