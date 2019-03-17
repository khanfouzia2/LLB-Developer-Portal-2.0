
const jwt = require('jsonwebtoken');
const {User} = require('./../database/models');

authentication = async function(req, res, next) {
	let frontend_token = req.header('Authorization');
	let token = frontend_token.split(' ')[1];
	let decoded;
	
  try { 
			console.log(token);
			decoded = jwt.verify(token, "saltkeyyessz123");
			let user = await User.findOne(
				{ where: 
					 {
							id : decoded.id,
							token: token
					 } 
				});
			if(user == null) return res.status(401).send();
			req.user = user;
      req.token = token;
      next(); 
    }
    catch(e) {
			console.log(`Error while calling authenticate middleware. error = ${e} `);
			res.status(500).send();
    }
}

module.exports = authentication;
