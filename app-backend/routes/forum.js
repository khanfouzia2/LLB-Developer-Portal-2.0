const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const querystring = require('querystring');
const authentication = require('../services/authentication.js');
const policies = require('../authorization/policies.js');

/*

  Routes for Forum

  TODO: Auth.

  Routes are:
  # GET /
  # GET /thread/:id
  # POST /
  # POST /comment

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

router.post('/comment', authentication, (req, res) => {

  console.log("\n\nPOST /comment request recieved.\tAuth: "+req.user.email);

  var thread_id = parseInt(req.body.thread_id, 10);
  var content = req.body.content;
  console.log(thread_id +"\n"+ content)

  // Validate content
  if(!thread_id || !content) {
    res.status(415).json({message: "Content not valid!"});
    return;
  }

  prom = models.Comment.create({
    content: content,
    thread_id: thread_id,
    author_id: req.user.id,
  });

  prom.then(data => {
    // If inserted successfully
    if(data != null) {
      res.json( data );
    } else {
      throw new Error("An error occured");
    }


  }).catch(err =>{
    console.log(err);
    res.status(500).json({message: "An error occured"});
  })

});


// Under construction!
router.delete('/comment/:id', authentication, (req, res) => {

  var comment_id = parseInt(req.params.id, 10)

  var pr = models.Comment.findByPk(comment_id);

  pr.then(cmt => {
    var policyCheck = policies.deleteComment(cmt, req.user);
    console.log("POLICY CHECK: " + policyCheck );

    if(cmt != null && policyCheck) {
      return pr2 = models.Comment.destroy({where: {id: 99}});  // soft delete [deleted_at is set at current timestamp]
    } else {
      res.status(403)
      throw new Error("Comment was not deleted! : Permission denied");
    }

  }).then(result => {
    console.log(result);
    if(result==true) {
      res.status(500);
    } else {
      console.log("#");
      res.status(404).send();
    }


  }).catch(err => {
    res.status(500);
    return;
  })

});

module.exports = router;
