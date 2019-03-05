
const express = require('express');
var router = express.Router();
const models = require('../database/models.js');

// Under construction

router.get('/test', (req, res) => {
  console.log("routing test OK!");
  res.end();
});

// For posting new News
router.post('/', (req, res) => {


  console.log( req.body );
  var title               = req.body.title;
  var cont                = req.body.content;
  var attachment_file     = req.body.attachment_file;

  var pr = models.News.create({
    title: title,
    author_id: 1,
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
