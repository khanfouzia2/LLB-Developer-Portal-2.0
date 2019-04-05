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

// Users
const USER_FORM_REGISTER = BASE_URL + 'users/register';
const USER_LOGIN =  BASE_URL + 'users/login';
const USER_LOGOUT = BASE_URL + 'users/logout';
const USER_ME = BASE_URL + 'users/me';
const USER_GENERATE_API = BASE_URL + 'users/apikey';
// Google Auth
const GOOGLE_LOGIN = BASE_URL + 'auth/google';

const FORUM_GET_RECENT = BASE_URL + 'forum/'
const FORUM_POST_NEW = BASE_URL + 'forum/'

//API KEY
module.exports = {
  NEWS_POST,
  NEWS_GET_ALL,
  NEWS_GET_ONE,
  NEWS_PATCH,
  NEWS_DELETE,
  NEWS_GET_DRAFTS,
  TOOLS_GET,
  USER_FORM_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_ME,
  FORUM_POST_NEW,
  GOOGLE_LOGIN,
  USER_GENERATE_API,
  FORUM_GET_RECENT
}
