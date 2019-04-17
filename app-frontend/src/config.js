/*
  This file contains some global configurations.

  IMPORT:
  import  * as config from '../../config.js'

  USAGE
  config.SOME_VALUE
*/

const BASE_URL = "http://localhost:8080/"

const DEFAULT_LOCALE = "fi-FI"


const ADMIN_ROLE_NAME       = "admin";
const BASIC_ROLE_NAME       = "basic";
const MODERATOR_ROLE_NAME   = "moderator";

// How long text is displayed
const NUM_OF_NEWS_SHOWN_PAGE = 10; // max number of news per page. Page 1 => [1..x] and so on...
const NEWS_SHOWN_CHARS = 300;
const NEWS_TITLE_MAXLEN = 100;
const NEWS_CONTENT_MAXLEN = 50000;
const NEWS_DEFAULT_BACKGROUND_FILENAME = "./bus.png";
// Should not happen, but better than nothing
const TEXT_IF_POST_EMPTY = "No content";

// Forum
const THREAD_TITLE_MAXLEN = 100;
const THREAD_CONTENT_MAXLEN = 50000;
const THREAD_COMMENT_MANXLEN =  5000;

// Global configs. for sanitizing content
const ALLOWED_TAGS = ['b', 'u', 'i', 'hr', 'br', 'a', 'img', 'pre', 'code', 'iframe', 'h5', 'h6'];
const ALLOWED_IFRAME_HOSTS = ['www.youtube.com', 'www.vimeo.com']
const ALLOWED_TAG_ATTRIBUTES = {
  'a': ['href', 'target'],
  'img': ['src', 'width', 'height'],
  'iframe': ['src', 'width', 'height']
}
const TEXT_FORMAT_HELP_TEXT = "Allowed tags are b, u, i, hr, br, a [href, target], img [src, width, height],\n pre, code, iframe, h5, h6.\n Remember to add http:// to links. We recomment using <pre>-tag for multiline codes. Allowed iframe hosts are Youtube and Vimeo."


// Will be deprecated and replaced with global configs ^
const THREAD_CONTENT_ALLOWED_TAGS = ['b', 'u', 'i', 'a', 'img', 'pre', 'code', 'iframe']
const THREAD_CONTENT_ALLOWED_IFRAME_HOSTS = ['www.youtube.com', 'www.vimeo.com']
const COMMENT_ALLOWED_TAGS = ['b','u','a','pre','code','br']

module.exports = {
  BASE_URL,
  DEFAULT_LOCALE,
  TEXT_IF_POST_EMPTY,
  NUM_OF_NEWS_SHOWN_PAGE,
  NEWS_TITLE_MAXLEN,
  NEWS_CONTENT_MAXLEN,
  ALLOWED_TAGS,
  ALLOWED_IFRAME_HOSTS,
  ALLOWED_TAG_ATTRIBUTES,
  THREAD_COMMENT_MANXLEN,
  THREAD_CONTENT_ALLOWED_TAGS,
  THREAD_CONTENT_ALLOWED_IFRAME_HOSTS,
  COMMENT_ALLOWED_TAGS,
  TEXT_FORMAT_HELP_TEXT,
  ADMIN_ROLE_NAME,
  NEWS_SHOWN_CHARS,
  NEWS_DEFAULT_BACKGROUND_FILENAME,
  THREAD_TITLE_MAXLEN,
  THREAD_CONTENT_MAXLEN
}
