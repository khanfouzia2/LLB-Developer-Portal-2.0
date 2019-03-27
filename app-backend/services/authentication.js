
const jwt = require('jsonwebtoken');
const {User} = require('./../database/models');

authentication = async function(req, res, next) {
	let frontend_token = req.cookies["Authorization"];
	let decoded;

  try {
			console.log('token: '+frontend_token);
			decoded = jwt.verify(frontend_token, "saltkeyyessz123");
			let user = await User.findOne(
				{ where:
					 {
							id : decoded.id,
							token: frontend_token
					 }
				});
			if(user == null) return res.status(401).send();
			req.user = user;
      req.frontend_token = frontend_token;
      next();
    }
    catch(e) {
			console.log(`Error while calling authenticate middleware. error = ${e} `);
			res.status(500).send();
    }
}

module.exports = authentication;
