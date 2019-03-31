const bycrypt = require('bcrypt');
const {User} = require('../database/models.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.GOOGLECALLBACKURL,
  },
  async (token, tokenSecret, profile, done) => {
      try {
        const {given_name,family_name, email} = profile._json;
        let user = await User.findOrCreate({where: { email: email }, defaults: {
          first_name: given_name,
          last_name: family_name,
          email: email,
          role: "basic",
          is_finished_survey: false,
          status: true
        }});
        return done(null, user);
      }
      catch(e) {
        console.log(`Error while trying to login or create user via gmail login. err = ${e}`)
        return done(e, null);
      }
      
  }
));

module.exports = passport;
