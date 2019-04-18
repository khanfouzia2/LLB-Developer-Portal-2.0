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


// TODO: Check permission
// Check ID validity
/*

  The promise returns an array with one or two elements.
  The first element is always the number of affected rows, while the second element
  is the actual affected rows (only supported in postgres with options.returning true.)

*/
router.patch("/thread/:id", authentication, (req,res) => {

  console.log("\n\t PATCH request received");
  console.log("\t"+req.user.email);


  var thread_id = parseInt(req.params.id, 10);

  if(!isNaN(thread_id) && req.body.thread_content != null) {

    var pr = models.Thread.update({
      content: req.body.thread_content
    }, {
      where: {
        id: {
          [Sequelize.Op.eq]: thread_id
        }
      },
      returning: true
    });

    // successfull value is array of updated IDs [objects/rows]
    pr.then(data => {
      console.log(data);
      res.status(200);
      res.json({success: true});
    }).catch(err => {
      console.log(err)
      res.status(500);
      res.json({message: "Error!"});
    })

  }
  // id not valid
  else {
    res.status(500);
    res.json({message: "Invalid content!"});
  }

  return;

});

router.delete('/comment/:id', authentication, (req, res) => {

  // Take the comment_id from call
  const comment_id = parseInt(req.params.id, 10)
  // Get by ID
  var pr = models.Comment.findByPk(comment_id); // NOTE: Does NOT find soft deleted rows (returns null). In this case it's OK.

  pr.then(cmt => {
    console.log(cmt)
    if(cmt==null) { return false; }
    // Check policies
    var policyCheck = policies.deleteComment(cmt, req.user);
    console.log("\tPOLICY CHECK: " + policyCheck );

    if(policyCheck) {
      // User is allowed to delete this Comment. (soft) Delete it
      return models.Comment.destroy({where: {id: comment_id}});  // soft delete [deleted_at is set at current timestamp]
    } else {
      // Send permission denied
      res.status(403).send();
      return false;
    }

  }).then(result => {

    // After trying to delete. Result is bool.
    console.log(result);
    if(result==true) {
      res.status(200).send(); // Success
      return;
    } else {
      res.status(404).send();
      return;
    }


  }).catch(err => {
    console.log(err);
    res.status(500).send();
    return;
  });

});






module.exports = router;
