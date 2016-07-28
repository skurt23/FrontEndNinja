/**
 * Created by Skurt on 27/7/16.
 */
var $ = require('jquery');
var requests = require('./requests');
var utils = require("./utils");

$(".article-list").on("click", ".btn", function(){
    var self = this;
    var articleId = $(this).parent().data('id');
    var articleTitle = $(this).parent().data('title');
    
    console.log(articleId);
    console.log(articleTitle);

    if ($(this).html() === 'Me gusta'){
        if (typeof(Storage) !== "undefined") {

            localStorage.setItem(articleId, articleTitle);
            $(self).html('No me gusta');
            $(self).attr('class', 'btn btn-danger');
            console.log($(self).html());
            
        }
    }else if ($(this).html() === 'No me gusta'){
        localStorage.removeItem(articleId);
        console.log(articleTitle);
        $(self).html('Me gusta');
        $(self).attr('class', 'btn btn-primary');
    }
    

    
});


module.exports = {

    load: function(){
        requests.list(function(response) {
            $('#row').html(''); // vaciamos la lista
            for (var i in response) {
                var article = response[i];

                var img = article.img || "";
                if (img == "") {
                    img = 'src/img/placeholder.jpeg';
                }
                var id = article.id || "";
                var author = article.author || "";
                var title = article.title || "";
                var text = article.smalltext || "";
                var date = article.date;
                var comments = article.comments.split(' , ');
                var length = comments.length;
                var like;

                function isFavorite(articleId) {


                    var item = localStorage.getItem(articleId);


                    if (item === null) {
                        return false
                    }else{
                        return true
                    }
                }

                if (isFavorite(id) === true){
                    like = '<button type="button" id="like" class="btn btn-danger">No me gusta</button>'
                }else {
                    like = '<button type="button" id="like" class="btn btn-primary">Me gusta</button>'
                }

                var html = '<article>';
                html += '<div class="col-sm-6 col-md-4">';
                html += '<div class="thumbnail">';
                html += '<img src="' + img + '">';
                html += '<div class="caption">';
                html += '<h3 class="title">' + title + '</h3>';
                html += '<p class="text">' + text + '</p>';
                html += '<img class="author-img" src="' + img + '">';
                html += '<a class="author">' + author + '</a>';
                html += '<div class="row"  data-id="' + id + '"  data-title="' + title + '">';
                html += '<a class="comments">Comentarios(' + length + ')</a>';
                html += '<span class="date">' + date + '</span>';
                html += like;
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</article>';
                $('#row').append(html);
                
            }
        }, function(error){
            console.error("ERROR", error);
        });
    }

};