/**
 * Created by Skurt on 27/7/16.
 */
var $ = require('jquery');

module.exports = {
    escapeHTML: function (str) {
        return $('<div>').text(str).html();
    }
};