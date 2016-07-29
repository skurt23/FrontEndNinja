/**
 * Created by Skurt on 27/7/16.
 */
var $ = require('jquery');

module.exports = {

    saveComment: function(article, successCallback, errorCallback) {

        var formData = new FormData();
        formData.append("nombre", article.name);
        formData.append("apellidos", article.lastName);
        formData.append("email", article.email);
        formData.append("text", article.text);

        article.comments.append(formData);
        $.ajax({
            url: "/api/articles/" + article.id,
            method: "put",
            data: formData,
            processData: false,
            contentType: false,
            success: successCallback,
            error: errorCallback
        });
    },


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
    }

};