/*
  File for REST API Endpoints
*/
//import { BASE_URL } from  './config.js';

const BASE_URL = "http://localhost:8080/"

// News
const NEWS_POST = BASE_URL + "news";
const NEWS_GET_ALL = BASE_URL + "news/page"; // +id
const NEWS_GET_ONE = BASE_URL + "news/id"; // +id
const NEWS_PATCH = BASE_URL + "news"; // +id
const NEWS_DELETE = BASE_URL + "news"; // +id
  const NEWS_DELETE_DONE_STATUS = 204;
const NEWS_GET_DRAFTS = BASE_URL + "news/drafts"

const TOOLS_GET = BASE_URL + "tools";

//Feedback
const FEEDBACK_POST = BASE_URL + 'feedback/';

// Users
const USER_FORM_REGISTER = BASE_URL + 'users/register';
const USER_LOGIN =  BASE_URL + 'users/login';
const USER_LOGOUT = BASE_URL + 'users/logout';
const USER_ME = BASE_URL + 'users/me';
const USER_GENERATE_API = BASE_URL + 'users/apikey';

// Google Auth
const GOOGLE_LOGIN = BASE_URL + 'auth/google';

// Forum and Threads
const FORUM_GET_RECENT    = BASE_URL + 'forum/'
const FORUM_POST_NEW      = BASE_URL + 'forum/'
const GET_THREAD          = BASE_URL + 'forum/thread' // +/id
const COMMENT_POST        = BASE_URL + 'forum/comment'
const COMMENT_DELETE      = BASE_URL + 'forum/comment' // +/id
  const COMMENT_DELETE_DONE_STATUS = 200;
const THREAD_PATCH        = BASE_URL + 'forum/thread' // +/id
  const THREAD_PATCH_DONE_STATUS = 200;
const THREAD_DELETE       = BASE_URL + 'forum/thread' // +/id
  const THREAD_DELETE_DONE_STATUS = 202;

// Mobile App
const USER_MOBILE_APPS = BASE_URL + 'mobileapps'
const USER_MOBILE_APPS_UPLOAD_FILE = BASE_URL + 'mobileapps/uploadfile'



/*
  Generic HTTP Status codes and their names
  https://httpstatuses.com/
*/

const HTTP_OK                   = 200;
const HTTP_CREATED              = 201; // Inserted to DB succesfully
const HTTP_NO_CONTENT           = 204; // Request OK, nothing is sent back
const HTTP_BAD_REQUEST          = 400;
const HTTP_UNAUTH               = 401;
const HTTP_FORBIDDEN            = 403; // No permission
const HTTP_NOT_FOUND            = 404; // ID not in DB
const HTTP_UNSUPPORTED_MEDIA    = 415; // Invalid content, for example string is empty
const HTTP_SERVER_ERR           = 500;



module.exports = {
  NEWS_POST,
  NEWS_GET_ALL,
  NEWS_GET_ONE,
  NEWS_PATCH,
  NEWS_DELETE,
  NEWS_DELETE_DONE_STATUS,
  NEWS_GET_DRAFTS,
  TOOLS_GET,
  FEEDBACK_POST,
  USER_FORM_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_ME,
  FORUM_GET_RECENT,
  FORUM_POST_NEW,
  COMMENT_POST,
  COMMENT_DELETE,
  COMMENT_DELETE_DONE_STATUS,
  THREAD_PATCH,
  THREAD_PATCH_DONE_STATUS,
  THREAD_DELETE,
  THREAD_DELETE_DONE_STATUS,
  GET_THREAD,
  GOOGLE_LOGIN,
  USER_GENERATE_API,
  USER_MOBILE_APPS,
  USER_MOBILE_APPS_UPLOAD_FILE,
  HTTP_OK,
  HTTP_CREATED,
  HTTP_NO_CONTENT,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTH,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_UNSUPPORTED_MEDIA,
  HTTP_SERVER_ERR,
}
