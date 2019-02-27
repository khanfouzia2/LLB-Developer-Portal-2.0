
const express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('sample route');
});

router.get('/*', function(req, res){
   res.send('Error Please check the URL');
});

module.exports = router;