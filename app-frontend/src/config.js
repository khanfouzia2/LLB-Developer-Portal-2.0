/*
  This file contains some global configurations.

  IMPORT:
  import  * as config from '../../config.js'

  USAGE
  config.SOME_VALUE
*/

const DEFAULT_LOCALE = "fi-FI"


const ADMIN_ROLE_NAME       = "admin";
const BASIC_ROLE_NAME       = "basic";
const MODERATOR_ROLE_NAME   = "moderator";

// How long text is displayed
const NUM_OF_NEWS_SHOWN_PAGE = 10; // max number of news per page. Page 1 => [1..x] and so on...
const NEWS_SHOWN_CHARS = 300;
const NEWS_TITLE_MAXLEN = 100;
const NEWS_CONTENT_MAXLEN = 50000;
const NEWS_DEFAULT_BACKGROUND_FILENAME = "bus.png";
// Should not happen, but better than nothing
const TEXT_IF_POST_EMPTY = "No content";





module.exports = {
  DEFAULT_LOCALE,
  TEXT_IF_POST_EMPTY,
  NUM_OF_NEWS_SHOWN_PAGE,
  NEWS_TITLE_MAXLEN,
  NEWS_CONTENT_MAXLEN,
  ADMIN_ROLE_NAME,
  NEWS_SHOWN_CHARS,
  NEWS_DEFAULT_BACKGROUND_FILENAME
}
