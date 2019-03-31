const express = require('express');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
const {User} = require('../database/models.js');
let passport = require('../passportJS/passport');
const util = require('../utils/userUtil');

generateToken = async (user) => {
  let token = jwt.sign({id: user.id}, `saltkeyyessz123`).toString();
  user.token = token;
  await user.save().then(() => token );
  return token;
}

router.get('/google', function(req, res, next){
  passport.authenticate('google',{ scope: ['email'] })(req, res, next);       
});

router.get('/google/callback', passport.authenticate('google', { session :false, failureRedirect: '/login' }),
async (req, res) => {
  console.log(typeof(req.user));
  console.log(req.user);
  let token = await util.GenerateJWT(req.user[0]);
  if(token == null) throw "Something wrong with generate token";
  res.cookie('Authorization', token);
  res.redirect(process.env.FRONTEND_LANDING_URL);
});
  

module.exports = router;