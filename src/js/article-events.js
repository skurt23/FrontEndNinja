/**
 * Created by Skurt on 27/7/16.
 */
var $ = require('jquery');

$(".article-list").on("click", ".btn", function(){
    var self = this;
    var articleId = $(this).parent().data('id');
    var articleTitle = $(this).parent().data('title');


    if ($(this).html() === 'Me gusta'){
        if (typeof(Storage) !== "undefined") {

            localStorage.setItem(articleId, articleTitle);
            $(self).html('No me gusta');
            $(self).attr('class', 'btn btn-danger');
            
        }
    }else if ($(this).html() === 'No me gusta'){
        localStorage.removeItem(articleId);
        $(self).html('Me gusta');
        $(self).attr('class', 'btn btn-primary');
    }
    
});

