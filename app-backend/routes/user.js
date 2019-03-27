const express = require('express');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
const {User} = require('../database/models.js');
const authentication = require('../services/authentication.js');

generateToken = async (user) => {
   let token = jwt.sign({id: user.id}, `saltkeyyessz123`).toString();
   user.token = token;
   await user.save().then(() => token );
   return token;
}

router.post('/register', async function(req, res){
   try {
      const payload = req.body;
      var user = await User.create({
         first_name: payload.first_name,
         last_name: payload.last_name,
         password: bycrypt.hashSync(payload.password, 11),
         email: payload.email,
         role: "basic",
         is_finished_survey: false,
         status: true
       });
      let token = await generateToken(user);
      if(token == null) throw "Something wrong with generate token";

      res.cookie('Authorization', token);
      res.status(201).send(JSON.stringify({
         first_name: user.first_name,
         last_name: user.last_name,
         email: user.email,
         role: user.role
      }));
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
   
      let token = await generateToken(user);
      if(token == null) throw "Something wrong when creating token";
   
      res.cookie('Authorization', token);
      res.status(200).send(JSON.stringify({
         first_name: user.first_name,
         last_name: user.last_name,
         email: user.email,
         role: user.role
      }));
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
      res.status(200).send(JSON.stringify({
         first_name: req.user.first_name,
         last_name: req.user.last_name,
         email: req.user.email,
         role: req.user.role
      }));
   }
   catch(e) {
      console.log(`Error while trying to login. error = ${e}`);
      res.status(500).send();
   }
});





module.exports = router;