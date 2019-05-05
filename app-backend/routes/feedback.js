const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const querystring = require('querystring');
const authentication = require('../services/authentication.js');

// TODO: Add auth.
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