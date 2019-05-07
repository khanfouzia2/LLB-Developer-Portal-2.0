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


  Returns

  When success :: 200

  {
      "success": true,
      "thread": [
          1,  // <--- Number of updated rows
          [
              {
                  "id": 1,
                  "forum_category_id": null,
                  "author_id": 1000,
                  "title": "Example thread",
                  "content": "...",
                  "created_at": "2019-05-03T08:59:07.851Z",
                  "updated_at": "2019-05-03T09:49:36.897Z",
                  "deleted_at": null
              }
          ]
      ]
  }

  On error: 500

  On invalid parameters: 400 (Bad request)
  json { message: "Error!" }


*/
router.patch("/thread/:id", authentication, (req,res) => {

  console.log("\n\tPATCH request received");
  console.log("\t"+req.user.email);

  // Get ID
  var thread_id = parseInt(req.params.id, 10);

  // Check IDs validity
  if(!isNaN(thread_id) && req.body.thread_content != null) {

    // Get Thread obj. and check editing policy (admin and owner can edit)
    pr_ = models.Thread.findByPk(thread_id); // NOTE: only finds not soft deleted rows
    pr_.then(row => {
      // Was found?
      if(!row) {
        res.status(404).send();
        return new Promise().resolve();
      }
      // Check permission
      const permission = policies.patchThread(row, req.user);
      if(!permission) {
        res.status(403).json({success: false, message: "Forbidden!"});
        return new Promise().resolve();
      }

      // Do the actual updating
      var pr = models.Thread.update({
        content: req.body.thread_content.trim()
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
        // If at lest 1 row changed
        if(data[0] >= 1) {
          res.status(200);
          res.json({success: true, thread: data});
        } else {
          res.status(404).json({success: false, message: "Not found!"});
        }
      }, (err) => {
        console.log(err)
        res.status(500);
        res.json({message: "Error!"});
      })

      return;
    }, (err) => {
      // error
      throw new Error(err);
    })


  }
  // id not valid
  else {
    res.status(400); // Bad request
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


/*
  Delete entire Thread.

  Returns:

  204: Request ok, but nothing to delete
    json { message: ""}

  202: Deletion was done successfully:
    json { message: "" }

  403: No permission.
    json { error: "" }

  500: Server error
    json { error: "" }
*/
router.delete('/thread/:id', authentication, (req, res) => {

  console.log("\n===\n\tDELETE request received");
  console.log("\t"+req.user.email);

  const thread_id = parseInt(req.params.id, 10);
  if(isNaN(thread_id) || thread_id <= 0) {
    res.status(400).json({error:'Bad request. ID not valid'}); // 400 Bad request
  }

  pr = models.Thread.findByPk(thread_id);
  pr.then(data => {

    // already deleted, find by pk only finds NOT soft deleted rows
    if(data == null) {
      res.status(404).json({message: 'ID not found'});
      return;
    }


    console.log(data)
    console.log( policies.deleteThread(data, req.user) );
    const isPermission = policies.deleteThread(data, req.user);
    if(!isPermission) {
      res.status(403).json({error: 'Permission denied'});
      return;
    }

    pr2 = models.Thread.destroy({
      where: {
        id: data.id
      }
    });

    pr2.then(data => {
      if(data === 0) {
        // 204 = OK, no further data
        res.status(204).send();
      } else {
        // 202 = deletion done
        res.status(202).json({message: 'Deleted successfully!' });
      }
    }, err => {
      res.status(500).json({error:'An error occured!'})
    })

  }, onFailure);


  var onFailure = function(err) {
    console.log("Sequelize query failed!")
    res.status(500).json({error:'An error occured!'})
  }

})




module.exports = router;
