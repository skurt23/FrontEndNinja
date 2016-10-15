/**
 * Created by Skurt on 27/7/16.
 */
var $ = require('jquery');

module.exports = {

    list: function(successCallback, errorCallback) {
        $.ajax({
            url: "/api/articles/",
            method: "get",
            success: successCallback,
            error: errorCallback
        });
    },

    detail: function(article ,successCallback, errorCallback) {
        $.ajax({
            url: "/api/articles/" + article,
            method: "get",
            success: successCallback,
            error: errorCallback
        });
    },

    listComments: function (succesCallback, errorCallback) {
        $.ajax({
            url: "/api/comments/",
            method: "get",
            success: succesCallback,
            error: errorCallback
        });
    },

    createComment: function (object, succesCallback, errorCallback) {
        $.ajax({
            url: "/api/comments/",
            method: "post",
            data: object,
            success: succesCallback,
            error: errorCallback
        });
    }

};