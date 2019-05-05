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
const THREAD_PATCH        = BASE_URL + 'forum/thread' // +/id
const THREAD_DELETE       = BASE_URL + 'forum/thread' // +/id

// Mobile App
const USER_MOBILE_APPS = BASE_URL + 'mobileapps'
const USER_MOBILE_APPS_UPLOAD_FILE = BASE_URL + 'mobileapps/uploadfile'

module.exports = {
  NEWS_POST,
  NEWS_GET_ALL,
  NEWS_GET_ONE,
  NEWS_PATCH,
  NEWS_DELETE,
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
  THREAD_PATCH,
  THREAD_DELETE,
  GET_THREAD,
  GOOGLE_LOGIN,
  USER_GENERATE_API,
  USER_MOBILE_APPS,
  USER_MOBILE_APPS_UPLOAD_FILE
}
