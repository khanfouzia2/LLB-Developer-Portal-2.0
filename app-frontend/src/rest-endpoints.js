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

module.exports = {
  NEWS_POST,
  NEWS_GET_ALL,
  NEWS_GET_ONE,
  NEWS_PATCH,
  NEWS_DELETE
}
