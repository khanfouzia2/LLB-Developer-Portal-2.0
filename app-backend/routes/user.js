const express = require('express');
var router = express.Router();

router.get('/:id',function(req, res){
   res.send('sample route');
});

router.get('/login',function(req, res){
   res.send('Error Please check the URL');
});

router.post('/', function(req, res){

});

router.post('/logout', function(req, res){

});


module.exports = router;