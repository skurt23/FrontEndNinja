/**
 * Created by Skurt on 27/7/16.
 */
var $ = require('jquery');

module.exports = {
    escapeHTML: function (str) {
        return $('<div>').text(str).html();
    },
    isFavorite: function(articleId) {


        var item = localStorage.getItem(articleId);


        if (item === null) {
            return false
        } else {
            return true
        }
    },
    getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
};