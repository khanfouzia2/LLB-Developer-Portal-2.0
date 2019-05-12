/*
  Configuration file for back-end
*/


const NUM_OF_NEWS_SHOWN_PAGE = 10; // max number of news per page. Page 1 => [1..x] and so on...

const NEWS_CONTENT_MAXLEN = 50000; // Chars
const NEWS_TITLE_MAXLEN = 100;

// Feedback
const FEEDBACK_LOAD_LIMIT = 20; // How many feedbacks are sent to user when requested. Also knows as SQL limit.

// Roles
const ADMIN_ROLE_NAME = "admin";
const BASIC_USER_ROLE_NAME = "basic";

module.exports = {
  NUM_OF_NEWS_SHOWN_PAGE,
  NEWS_CONTENT_MAXLEN,
  ADMIN_ROLE_NAME,
  BASIC_USER_ROLE_NAME,
  FEEDBACK_LOAD_LIMIT
}
