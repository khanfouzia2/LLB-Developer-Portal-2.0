const express = require('express');
const bycrypt = require('bcrypt');
const router = express.Router();
const {User, Apikey} = require('../database/models.js');
const authentication = require('../services/authentication.js');
const util = require('../utils/userUtil');
const axios = require('axios');

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
      const match = await bycrypt.compare(payload.password, user.password);
      if(!match) {
         return res.status(401).send();
      }
     
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

router.put('/me', authentication, async function(req, res) {
   try {
      const payload = req.body;
      let user = req.user;
      user.first_name = payload.first_name;
      user.last_name = payload.last_name;
      user.password = (payload.password !== null || payload.password !== "")
                      ? bycrypt.hashSync(payload.password, 11) : user.password;

      let newUser = await user.save();
      return res.status(200).send(util.GenerateResponseConext(newUser));
   }
   catch(e) {
      console.log(`Error while trying to login. error = ${e}`);
      res.status(500).send();
   }
})

router.post('/apikey', authentication ,async function(req, res){
   try {                 
      dashboard_creds = process.env.TYK_DASHBOARD_CRED;
      api_id = process.env.TYK_API_KEY;
      url = 'https://admin.cloud.tyk.io/api/keys';

      headers = {
        'authorization': dashboard_creds,
        'Content-Type': 'application/json'
      }
      const payload = {
        "allowance":1000,
        "rate":1000,
        "per":60,
        "expires":0,
        "quota_max":-1,
        "quota_renews":1510452082,
        "quota_remaining":-1,
        "quota_renewal_rate":60,
        "access_rights": {
          api_id:{
            "api_name":"LLB Bus API",
            "api_id":api_id,
            "versions":["Default"],
            "allowed_urls":[]
          }
        },
        "apply_policy_id":"5a07a7949b82ed0001584c92",
        "tags":[],
        "jwt_data":{"secret":""},
        "meta_data":{},
        "alias": req.user.email
      }

      let result = await axios.post(url, payload ,{
         headers: {
            'authorization': dashboard_creds,
            'Content-Type': 'application/json'
         }
       });

      if(result.status == 200) {
         console.log(result.data);
         let apiKey = await Apikey.create({
            service_name: "Uusimaa LLB API",
            api_key: result.data.key_id,
            user_id: req.user.id,
         });
         return res.status(200).send(apiKey);
      }
   }
   catch(e) {
      console.log(e);
      res.status(500).send();
   }   
})

router.get('/apikey', authentication ,async function(req, res){
   try {
      let apiKey = await Apikey.findOne(
         { where: 
            {
               user_id : req.user.id,
            } 
         });
      return res.status(200).send(apiKey);
   }
   catch(e) {
      console.log(`Error while trying to login. error = ${e}`);
      res.status(500).send();
   }
});



module.exports = router;