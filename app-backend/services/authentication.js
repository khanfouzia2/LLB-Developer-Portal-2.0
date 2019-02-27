
authentication = function(req, res, next) {
	console.log("authentication takes place");
	next();
}

module.exports = authentication;
