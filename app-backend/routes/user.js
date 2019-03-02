const express = require('express');
var router = express.Router();

router.get('/login',function(req, res){
   res.send('login command');
});

router.post('/', function(req, res){
	res.send('users default page');
});

router.post('/logout', function(req, res){

});

router.get('/:id',function(req, res){
   res.send('id user route');
});

module.exports = router;