
const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const querystring = require('querystring');
const authentication = require('../services/authentication.js');
const policies = require('../authorization/policies.js');
// Under construction

/*

  Routes for News-resource

  TODO:
    - Check user role
    - Check input
    - Send better error responses


  Routes are:
    # GET       /id/:id
    # GET       /page/:page
    # POST      /
    # GET       /drafts
    # PATCH     /:id
    # DELETE    /:id

*/



/*

  Gets one News-object with autor (user) object.

  Returns (success):
  HTTP 200
  JSON
  {
    "id": 1,
    "author_id": 1000,
    "title": "Example news",
    "content": "Some example content, <b>yay!</b>",
    "is_visible": false,
    "header_picture_filename": null,
    "created_at": "2019-05-07T13:43:28.927Z",
    "updated_at": "2019-05-07T13:43:28.880Z",
    "deleted_at": null,
    "user": {
        "id": 1000,
        "first_name": "Admin",
        "last_name": "Admin",
        "email": "admin@admin.com",
        "role": "admin",
        "status": false,
        "is_single_sign_on": false,
        "created_at": "2019-05-07T13:43:28.921Z"
    }

    500 Server error
    400 Bad request
    404 ID not found from DB. Also applies for [soft]deleted rows.

}

*/
router.get('/id/:id', (req, res) => {
  console.log("GET News ")

  const id = parseInt(req.params.id, 10) // base 10
  if(!isNaN(id) && id > 0) {

    // Try to find News ID, second param is options
    var newsPromise = models.News.findByPk(id, {
      include: [{
        model: models.User,
        attributes: { exclude: models.secluded.user } // Do not include password and some other fields.
      }]
    }); // returns a promise

    newsPromise.then(data => {

      console.log(data);
      // If not found, return value is null
      if(data != null) {
        res.status(200);
        res.json(data); // + send
      } else {
        res.status(404); // Not found
        res.send();
      }
    }, (err) => {
      // If promise itself failed for some reason (eg. database error)
      res.status(500).send();
    });

  } else {
    // Bad request. ID is not valid
    res.status(400).send();
  }

});

/*

  Public route for getting multiple News.
  Returns array of News objects with user (author) object.

  HTTP 200 [<News>, ...] on success (JSON)
  HTTP 500 on error

*/
router.get('/page/:page', (req, res) => {

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#relations-associations
  // https://stackoverflow.com/questions/40360431/get-children-from-parent-sequelize

  var page = req.params.page; // page number is string (at this point)!
  console.log("\n===\nPage received: "+page)
  page = parseInt(page, 10) // base 10
  if(isNaN(page) || page <= 0) {
    page = 1;
  }


  // Pagination. How many news are skipped. on page 2, skip 2-1*X [for example get 11-20]
  const offset_ = (page-1) * config.NUM_OF_NEWS_SHOWN_PAGE;
  console.log("Page after checks: "+page)
  console.log("Fetching News... OFFSET: " + offset_ );

  // Query
  var pr = models.News.findAll({
    where: {
      is_visible: true
    },
    include: [{
        model: models.User,
        attributes: { exclude: models.secluded.user } // Do not include password and some other fields.
    }],
    limit: config.NUM_OF_NEWS_SHOWN_PAGE,
    offset: offset_,
    order: Sequelize.literal('created_at DESC') // newest first
  });

  // Resolve promise. On success, data is sent no matter if content is empty ([]). Code 200
  pr.then(data => {

    //console.log(data)
    res.status(200)
    res.json(data);
    //res.send();

  }, (err) => {
    res.status(500).send();
  });


});

// For posting new News
router.post('/', authentication, (req, res) => {

  console.log("POST News");
  console.log( req.body );

  // Check user role. Deny if no admin role
  if(!policies.isAdmin(req.user)) {
    res.status(403).send(); // 403 = permission denied | 403 (Forbidden)
    return;
  }

  try {
    var title               = req.body.title.trim();
    var cont                = req.body.content.trim().substr(0, config.NEWS_CONTENT_MAXLEN);
    var is_visible          = req.body.is_visible;
    //var attachment_file     = req.body.attachment_file;
  } catch(err) {
    res.status(415).send(); // Media not supported
    return;
  }

  // Make some content validation
  // Check for null
  var contentValid = true;
  if(title && cont) {
    if(title.lenght < 3 || cont.lenght < 3 || title === "" || cont === "") {
      contenValid = false;
    }
  } else {
    contentValid = false;
  }
  if(!contentValid) {
    // 415 Media not supported. aka invalid content
    res.status(415).json({message: "Invalid content. News not saved!"});
    return;
  }


  var pr = models.News.create({
    title: title,
    author_id: req.user.id,
    content: cont,
    is_visible: is_visible
  });

  pr.then(data => {
    console.log(data);
    res.status(201).json({message: "News created successfully!"});
  }, (err) => {
    res.status(500).json({message: "An error occured."});
  })


});


/*
  PATCH News
  Can only patch News that are not [soft]deleted
*/
router.patch('/:id', authentication, (req, res) => {
  console.log("\n===\nPATCH Request received...");
  console.log( req.body );

  const id = parseInt(req.params.id, 10);
  if(isNaN(id) || id <= 0) {
    res.status(415).send(); return;
  }

  // Step 1 - Policy check
  if(!policies.isAdmin(req.user)) {
    res.status(403).send(); return;
  }

  // Step 2 - Content check
  if(!req.body.title || !req.body.content || !(req.body.is_visible === false || req.body.is_visible === true) ) {
    console.log("Invalid content");
    res.status(415).send(); return;
  }

  // Step 3 - Get the News
  var pr = models.News.findByPk(id);

  // Step 4 - If success. Update.
  pr.then(obj => {
    console.log(" ID found. " + obj)

    if(obj != null) {

      var pr2 = obj.update({
        title: req.body.title,
        content: req.body.content,
        is_visible: req.body.is_visible,
      });

      pr2.then(data => {
          res.json({message:"Updated successfully!", news: data});
          return;
        }, (err) => {
          console.log(err)
          res.status(500).send();
          return;
        }
      );

    } else {
      res.status(404).send();
      return;
    }
  });

  pr.catch((err) => {
      res.status(500).send();
  })


});

/*
  GET Drafts

  @Response
    Array of News objects [News-obj] (JSON)
    OR
    {
      message: String,
      success: Boolean
    }
    on error
*/
router.get('/drafts', authentication, (req, res) => {

  console.log("===\nGET Drafts")

  // Auth.
  if(!policies.isAdmin(req.user)) {
    res.status(403).json({message: 'Permission denied', success: false});
    return;
  }

  // http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-findAll
  var pr = models.News.findAll({
    where: { is_visible: false },
    include: [{
      model: models.User,
      attributes: { exclude: models.secluded.user } // Do not include password and some other fields.
    }]
  });

  pr.then(data => {
    res.status(200).json( data );
  }, (err) => {
    console.log( err )
    res.status(500).json({message:'Retrieving drafts failed!', success: false});
  });

});

/*
  Under const.


  Returns JSON object with values:
    message:String
    success:Boolean

  204 If params ok. No matter if resource was deleted or not
  400 If id is invalid
  403 If not permission (Not implemented yet)
  500 Server error

*/
router.delete('/:id', authentication, (req, res) => {

  var msg, success;
  var status = 404;
  console.log("\n===\nNews.js | DELETE Request received...");
  console.log("Auth. user is: "+ req.user.email + ", id: " + req.user.id)

  // Permission/Policy check
  if(!policies.isAdmin(req.user)) {
    res.status(403).send(); // Forbidden
    return;
  }

  const id = parseInt(req.params.id, 10)
  if(!isNaN(id)) {
    console.log("news ID: " + id);

    // Delete
    var pr = models.News.destroy({
      where: {
        id: id
      }
    });

    // Resolve Promise. Contains integer 1/0 if deletion was done.
    pr.then(data => {
      console.log(data)
      if(data == true) {
        status = 204;
        msg = `${id} was successfully deleted from the database!`;
        success = true;
      } else {
        status = 409; // Conflict -- Already deleted or not found
        msg = `${id} was NOT deleted from the database!`;
        success = false;
      }

    }, (err) => {
      console.log("ERROR: " + err)
      status = 500;
      msg = `Error: ${err}`;
      success = false;
    });

    pr.finally(() => {
      console.log("Status: " + status + ", " + msg)
      res.status(status).json({ message: msg, success: success });
    })

  } else {
    res.status(400).json({ message: "Bad request", success: false });
  }

});



module.exports = router;
