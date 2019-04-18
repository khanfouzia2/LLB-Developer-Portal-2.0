
const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const querystring = require('querystring');
const authentication = require('../services/authentication.js');
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

router.get('/id/:id', (req, res) => {
  console.log("GET News ")

  try {
    id = parseInt(req.params.id, 10) // base 10
    if(!isNaN(id) && id > 0) {

      // Try to find News ID, second param is options
      var news = models.News.findByPk(id, {
        include: [{
          model: models.User,
        }]
      }); // Promise

      news.then(data => {
        res.status(200);
        res.json(data); // + send
      }).catch(err => {
        res.status(404).send();
      });

    } else {
      res.status(500).send();
    }
  } catch(err) {
    console.log("Error " + err);
    res.status(500).send();
  }

});

router.get('/page/:page', (req, res) => {

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#relations-associations
  // https://stackoverflow.com/questions/40360431/get-children-from-parent-sequelize

  var page = req.params.page; // page number is string (at this point)!
  console.log("\n===\nPage received: "+page)
  try {
    page = parseInt(page, 10) // base 10
    if(isNaN(page) || page <= 0) {
      page = 1;
    }
  } catch(err) {
    console.log( err );
    page = 1;
  }
  console.log("Page after checks: "+page)

  // Pagination. How many news are skipped. on page 2, skip 2-1*X [for example get 11-20]
  var offset_ = (page-1) * config.NUM_OF_NEWS_SHOWN_PAGE;
  console.log("Fetching News... OFFSET: " + offset_ );

  // Query
  var pr = models.News.findAll({
    where: {
      is_visible: true
    },
    include: [{
        model: models.User,
    }],
    limit: config.NUM_OF_NEWS_SHOWN_PAGE,
    offset: offset_,
    order: Sequelize.literal('created_at DESC') // newest first
  });



  pr.then(data => {

    //console.log(data)
    res.status(200)
    res.json(data);
    //res.send();

  }).catch(err => {
    res.json({error: "Error"})
    //res.send();
  });


});

// For posting new News
router.post('/', authentication, (req, res) => {

  console.log("Making a new News!");
  console.log( req.body );

  // Check user role. Deny if no admin role
  if(req.user.role != config.ADMIN_ROLE_NAME) {
    res.status(403).send(); // 403 = permission denied | 403 (Forbidden)
  }

  try {
    var title               = req.body.title.trim();
    var cont                = req.body.content.trim().substr(0, config.NEWS_CONTENT_MAXLEN);
    var is_visible          = req.body.is_visible;
    //var attachment_file     = req.body.attachment_file;
  } catch(err) {
    res.status(500).send();
  }

  // Make some content validation
  // Check for null
  var contentValid;
  if(title && cont) {
    if(title.lenght <= 0 || cont.lenght <= 0 || title === "" || cont === "") {
      contenValid = false;
    }
  } else {
    contentValid = false;
  }
  if(!contentValid) {
    // 415 Media not supported. aka invalid content
    res.status(415).send();
  }


  var pr = models.News.create({
    title: title,
    author_id: req.user.id,
    content: cont,
    is_visible: is_visible
  });

  pr.then(data => {
    console.log(data);
    res.status(201).send();
  }).catch(err => {
    res.status(500).send();
  })

  // 201 = Resource created successfully
  res.status(201).send();

});

router.patch('/:id', authentication, (req, res) => {
  console.log("\n===\nPATCH Request received...");
  console.log( req.body );

  // Step 1 - Content check
  if(!req.body.title || !req.body.content || req.body.is_visible == undefined) {
    console.log("Invalid content");
    res.status(500).send();
  }

  // Step 2 - Get the News
  var pr = models.News.findByPk(req.body.id);

  // Step 3 - If success. Update.
  pr.then(obj => {
    console.log(" ID found. " + obj)

    obj.update({
      title: req.body.title,
      content: req.body.content,
      is_visible: req.body.is_visible,
    }).catch((err) => {
        res.status(500).send();
    })


  }).catch(err => {
    console.log("  ID NOT found. " + err)
    res.status(404).send();
  });

  res.send();

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
  if(req.user.role != config.ADMIN_ROLE_NAME) {
    res.json({message: 'Permission denied', success: false});
  }

  // http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-findAll
  var pr = models.News.findAll({
    where: { is_visible: false }
  });

  pr.then(data => {
    res.json( data );
  }).catch(err => {
    console.log( err )
    res.json({message:'Retrieving drafts failed!', success: false});
  });

});

/*
  Under const.


  Returns JSON object with values:
    message:String
    success:Boolean
*/
router.delete('/:id', authentication, (req, res) => {

  var msg, success;
  console.log("\n===\nNews.js | DELETE Request received...");
  console.log("Auth. user is: "+ req.user.email + ", id: " + req.user.id)
  //console.log(req);

  if(!isNaN( parseInt(req.params.id))) {
    var id = req.params.id;
    console.log("news ID: " + id);
    // Delete
    var pr = models.News.destroy({
      where: {
        id: id
      }
    });

    // Resolve Promise. Contains integer 1/0 if deletion was done.
    pr.then(data => {
      if(data == true) {
        msg = `${id} was successfully deleted from the database!`;
        success = true;
      } else {
        msg = `${id} was NOT deleted from the database!`;
        success = false;
      }

    }).catch(err => {
      console.log("ERROR: " + err)
      msg = `Error: ${err}`;
      success = false;
    });

  } else {
    msg = `Error: Invalid param (news ID)`;
    success = false;
  }

  // Send the final result
  res.json({ message: msg, success: success });


});



module.exports = router;
