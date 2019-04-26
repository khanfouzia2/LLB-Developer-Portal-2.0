const express = require('express');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
const {User} = require('../database/models.js');
let passport = require('../passportJS/passport');
const util = require('../utils/userUtil');

router.get('/google', function(req, res, next){
  passport.authenticate('google',{ scope: 
    ['https://www.googleapis.com/auth/userinfo.email', 
    'https://www.googleapis.com/auth/userinfo.profile'] })(req, res, next);       
});

router.get('/google/callback', passport.authenticate('google', { session :false, failureRedirect: '/login' }),
async (req, res) => {
  let token = await util.GenerateJWT(req.user[0]);
  if(token == null) throw "Something wrong with generate token";
  res.cookie('Authorization', token);
  res.redirect(process.env.FRONTEND_LANDING_URL);
});
  

module.exports = router;