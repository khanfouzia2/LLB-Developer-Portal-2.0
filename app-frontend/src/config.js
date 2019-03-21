/*
  This file contains some global configurations.

  IMPORT:
  import  * as config from '../../config.js'

  USAGE
  config.SOME_VALUE
*/

const DEFAULT_LOCALE = "fi-FI"


// How long text is displayed
const NUM_OF_NEWS_SHOWN_PAGE = 10; // max number of news per page. Page 1 => [1..x] and so on...
const NEWS_SHOWN_CHARS = 300;
const NEWS_DEFAULT_BACKGROUND_FILENAME = "bus.png";
// Should not happen, but better than nothing
const TEXT_IF_POST_EMPTY = "No content";





module.exports = {
  DEFAULT_LOCALE,
  TEXT_IF_POST_EMPTY,
  NUM_OF_NEWS_SHOWN_PAGE,
  NEWS_SHOWN_CHARS,
  NEWS_DEFAULT_BACKGROUND_FILENAME
}
