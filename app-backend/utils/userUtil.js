const jwt = require('jsonwebtoken');

const GenerateResponseConext = (user) => {
   return JSON.stringify({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    is_single_sign_on: user.is_single_sign_on,
    is_finished_survey: user.is_finished_survey
   });
}
const GenerateJWT = async (user) => {
    let token = jwt.sign({id: user.id}, `saltkeyyessz123`).toString();
    user.token = token;
    await user.save().then(() => token );
    return token;
};

module.exports = {
  GenerateResponseConext,
  GenerateJWT
}