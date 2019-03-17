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

router.post('/regiser', async function(req, res){
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

      res.setHeader("Authorization", token);
      res.status(201).send();
   }
   catch(e) {
      console.log(e);
      res.status(500).send();
   }   
})

router.get('/login', async function(req, res){
   try {
      const payload = req.body;
      let user = await User.find(
         { where: 
            {
               email : payload.email,
               password: bycrypt.hashSync(payload.password, 11)
            } 
         });
      if(user == null) res.status(401).send();
      let token = await generateToken(user);
      if(token == null) throw "Something wrong when creating token";
      res.setHeader("Authorization", token);
      res.status(200).send();
   }
   catch(e) {
      console.log(`Error while trying to login. error = ${e}`);
      res.sendStatus(500).send();
   }
});

router.get('/logout', authentication , async function(req, res){
   try {
      req.user.token = "";
      await req.user.save({fields: ['token']}).save();
      res.status(200).send();
   }
   catch(e) {
      console.log(`Error while trying to logout. error = ${e}`);
      res.sendStatus(500).send();
   }
});



router.post('/logout', function(req, res){

});

router.get('/:id',function(req, res){
   res.send('id user route');
});





module.exports = router;