
const express = require('express');
var router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const config = require('../config.js');
const authentication = require('../services/authentication.js');
// Under construction


router.get('/page/:page', (req, res) => {

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#relations-associations
  // https://stackoverflow.com/questions/40360431/get-children-from-parent-sequelize

  var page = req.params.page; // page number is string (at this point)!
  console.log("Page/offset: "+page)
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

  console.log( req.body );

  // Check user role. Deny if no admin role
  if(req.user.role != config.ADMIN_ROLE_NAME) {
    res.status(403).end(); // 403 = permission denied | 403 (Forbidden)
  }

  var title               = req.body.title.trim();
  var cont                = req.body.content.substr(0, );
  var attachment_file     = req.body.attachment_file;

  var pr = models.News.create({
    title: title,
    author_id: req.user.id,
    content: cont,
    is_visible: true
  });

  pr.then(data => {
    console.log(data);
  }).catch(err => {
    console.log("Error :: create");
  })

  // 201 = Resource created successfully
  res.status(201).end();

});





module.exports = router;
