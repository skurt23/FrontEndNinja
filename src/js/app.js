/**
 * Created by Skurt on 21/7/16.
 */

var $ = require('jquery');

global.jQuery = $;
require('bootstrap-sass');
var article = require('./articles');

article.load();