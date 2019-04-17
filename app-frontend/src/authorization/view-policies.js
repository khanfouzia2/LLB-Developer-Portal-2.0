import { ADMIN_ROLE_NAME } from '../config.js';
/*

  view-policies.js

  Functions to check if authenticated user is allowed to see the given view

*/



export function editThreadPolicy(user=null, thread=null) {
  // Check objects validity before actual check
  if(user != null && thread != null && 'id' in user && 'role' in user && 'author_id' in thread) {
    return (thread.author_id === user.id || user.role === ADMIN_ROLE_NAME);
  }

  return false;

}


/*module.exports = {
  editThread
}
*/
