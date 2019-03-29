var config = require('./config.js');


/*
  is a valid interger and larger than 1
*/
exports.isValidID = function(id) {

  id = parseInt(id, 10); // base 10
  if(id != undefined && !isNaN(id)) {
    return id > 0;
  } else {
    return false;
  }

}

/*
  Adds tree dots at the end of the string if it is too long

  "Lorem ips..."
*/
exports.niceSubstr = function(str, maxlen) {
  if(str) {
    return str.length > maxlen ? str.substr(0, maxlen-3)+"..." : str;
  } else {
    return "";
  }
}

exports.getDateFormatted = function(timestamp) {

  try {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:"numeric", minute:"numeric" };
    var ts = new Date(timestamp);
    return ts.toLocaleDateString(config.DEFAULT_LOCALE, options);
  }
  catch(err) {
    console.log(err);
    return null;
  }

}
