var config = require('./config.js');
var sanitizeHtml = require('sanitize-html');

/*
  is a valid interger and larger than 1
*/
exports.isValidID = function(id) {

  if(id) {
    id = parseInt(id, 10); // base 10
    if(id != undefined && !isNaN(id)) {
      return id > 0;
    } else {
      return false;
    }
  }
  return false;

}

/*
  First checks if is null, undefined, isNaN ...
  Then will check length of trimmed string.
*/
exports.isStringEmpty = function(str) {
  if(str) {
    return str.trim().lenth === 0
  }
  return true;
}

/*

  Dangerois html sanitizer method used globally.
  Uses sanitizeHtml npm package

*/
exports.getSanitizedContent = function(dirty) {
  // see react docs for this return...
  return {__html: sanitizeHtml(dirty, {
      allowedTags: config.ALLOWED_TAGS,
      allowedAttributes: config.ALLOWED_TAG_ATTRIBUTES,
      allowedIframeHostnames: config.THREAD_CONTENT_ALLOWED_IFRAME_HOSTS,
      transformTags: {
        'a': sanitizeHtml.simpleTransform('a', {target: '_blank'})
      }
    })
  };
}




/*
  Returns singular or plural string based on amount
  (3, "cat", "cats") ==> "cats"
*/
exports.getNumericBending = function(amount, singular, plural) {
  return amount == 1 ? singular : plural;
}

exports.redirectUser = function(url=null) {
  if(url==null) {
    window.location.reload();
  }
  window.location.href = url;
}

exports.getAuthorDetails = function(userObj) {
  if(userObj.first_name && userObj.last_name) {
    return userObj.first_name +" " + userObj.last_name;
  } else{
    return "Unknown author"
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

/* Generates some random text. For development */
exports.getLorem = function(len) {

  var s = "Lorem Ipsum ";
  var possible = "aiaikkkststsuvaiaiabcdehijklmnoprstuv"; // len 52
  var text = s;

  var i = 12;
  while(i <= len) {
    text += possible.charAt( Math.floor(Math.random() * possible.length)  );
    // Space
    if(i % Math.floor(Math.random()*30) == 0 ) {
      text += " ";
    }
    i++;
  }
  return text.substr(0,len);

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
