/*
  File for REST API Endpoints
*/
const BASE_URL = "http://localhost:8080/"



// News
const NEWS_POST = BASE_URL + "news";
const NEWS_GET_ALL = BASE_URL + "news";
const NEWS_GET_ONE = BASE_URL + "news";
const NEWS_PATCH = BASE_URL + "news";
const NEWS_DELETE = BASE_URL + "news";
const TOOLS_GET = BASE_URL + "tools";

// Users
const USER_FORM_REGISTER = BASE_URL + 'users/register';
const USER_LOGIN =  BASE_URL + 'users/login';
const USER_LOGOUT = BASE_URL + 'users/logout';

module.exports = {
  NEWS_POST,
  NEWS_GET_ALL,
  NEWS_GET_ONE,
  NEWS_PATCH,
  NEWS_DELETE,
  TOOLS_GET,
  USER_FORM_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
}
