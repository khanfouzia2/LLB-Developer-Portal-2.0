const express = require('express');
const bycrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../database/models.js');
const authentication = require('../services/authentication.js');
const util = require('../utils/userUtil');

router.post('/register', async function(req, res){
   try {
      const payload = req.body;
      let user = await User.create({
         first_name: payload.first_name,
         last_name: payload.last_name,
         password: bycrypt.hashSync(payload.password, 11),
         email: payload.email,
         role: "basic",
         is_finished_survey: false,
         status: true
       });
      let token = await util.GenerateJWT(user);
      if(token == null) throw "Something wrong with generate token";

      res.cookie('Authorization', token);
      res.status(201).send(util.GenerateResponseConext(user));
   }
   catch(e) {
      console.log(e);
      res.status(500).send();
   }   
})

router.post('/login', async function(req, res){
   try {
      const payload = req.body;
      console.log(payload);
      let user = await User.findOne(
         { where: 
            {
               email : payload.email,
            } 
         });

      if(user == null) return res.status(404).send();
      if(!bycrypt.compare(payload.password , user.password)) return res.status(401).send();
   
      let token = await util.GenerateJWT(user);
      if(token == null) throw "Something wrong when creating token";
   
      res.cookie('Authorization', token);
      res.status(200).send(util.GenerateResponseConext(user));
   }
   catch(e) {
      console.log(`Error while trying to login. error = ${e}`);
      res.status(500).send();
   }
});

router.get('/logout', authentication , async function(req, res){
   try {
      req.user.token = "";
      await req.user.save({fields: ['token']});
      res.status(200).send();
   }
   catch(e) {
      console.log(`Error while trying to logout. error = ${e}`);
      res.status(500).send();
   }
});


router.get('/me',authentication,function(req, res){
   try {
      res.status(200).send(util.GenerateResponseConext(req.user));
   }
   catch(e) {
      console.log(`Error while trying to login. error = ${e}`);
      res.status(500).send();
   }
});





module.exports = router;