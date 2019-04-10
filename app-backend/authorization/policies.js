const config = require('../config.js');
/*

  Policies are resource based permission definitions on certain actions.
  Policy-check is done after basic authentication and middlewares and provides
  more specific rules.

  Policy function (usually) receives an object and an user object, and
  check if that user has permission to do the action for that particual object/resource.
  Policy function return boolean TRUE if user has permission to do the action.

  For example:
  Does [role] moderator have permission to edit post made by admin?
  OR is user able to delete his own post
  OR is thread owner able to delete comments?

  HTTP status code 403 should be sent. [403 access denied]

*/




/*
  - User can delete his own comment
  - Admin can delete any comment
*/
exports.deleteComment = function(cmt=null, user=null) {

  // both must be not null
  if( anyNulls(cmt, user) ) { return false; }

  return (
    (cmt.author_id != null && cmt.author_id === user.id) || user.role === config.ADMIN_ROLE_NAME
  );

  return false;

}















/* Helpers functions */
function anyNulls(obj, user) {
  return (obj == null || user == null);
}

function validUser(user) {
  return ( 'role' in user && 'id' in user );
}
