/**
 * Created by Skurt on 28/7/16.
 */
var $ = require('jquery');
var requests = require('./requests');
var utils = require('./utils');

module.exports = {

    load: function () {
        requests.list(function (response) {
            $('#row').html('');
            for (var i in response) {
                var article = response[i];

                var htmlresource;
                var video = article.vid || "";
                var img = article.img || "";
                if (img == "" && video == ""){
                    img = 'src/img/placeholder.jpeg';
                    htmlresource = '<img class="placeholder" src="' + img + '">';
                }else if(img == "" && video !== ""){
                    htmlresource = '<iframe class="video" src="' + video + '"></iframe>';
                }else if(img !== "" && video == ""){
                    htmlresource = '<img class="placeholder" src="' + img + '">';
                }
                var authorimg = article.authorimg || "";
                if (authorimg == ""){
                    authorimg = 'src/img/placeholder.jpeg';
                }
                var id = article.id || "";
                var author = article.author || "";
                var title = article.title || "";
                var text = article.smalltext || "";
                var date = article.date;
                var comments = JSON.parse(article.comments);
                var length = comments.length;
                var like;


                if (utils.isFavorite(id) === true) {
                    like = '<button type="button" id="like" class="btn btn-danger">No me gusta</button>'
                } else {
                    like = '<button type="button" id="like" class="btn btn-primary">Me gusta</button>'
                }

                var html = '<article>';
                html += '<div class="col-sm-6 col-md-4">';
                html += '<div class="thumbnail">';
                html += htmlresource;
                html += '<div class="caption" id="id" data-id="' + id + '"  data-title="' + title + '">';
                html += '<a href="../../detail.html" class="title">' + title + '</a>';
                html += '<p class="text">' + text + '</p>';
                html += '<img class="author-img" src="' + authorimg + '">';
                html += '<p class="author">' + author + '</p>';
                html += '<div class="row">';
                html += '<a class="comments">Comentarios(' + length + ')</a>';
                html += '<span class="date">' + date + '</span>';
                html += '</div>';
                html += like;
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</article>';
                $('#row').append(html);

            }
        }, function (error) {
            console.error("ERROR", error);
        });
    },
    loadDetail: function () {
        requests.detail(2, function (response) {
            $('detail').html('');
            var article = response;

            var img = article.img || "";
            if (img == "") {
                img = 'src/img/placeholder.jpeg';
            }
            var authorimg = article.authorimg || "";
            if (authorimg == ""){
                authorimg = 'src/img/placeholder.jpeg';
            }
            var id = article.id || "";
            var author = article.author || "";
            var title = article.title || "";
            var text = article.text || "";
            var date = article.date;
            var comments = JSON.parse(article.comments);
            var like;



            if (utils.isFavorite(id) === true) {
                like = '<button type="button" id="like" class="btn btn-danger">No me gusta</button>'
            } else {
                like = '<button type="button" id="like" class="btn btn-primary">Me gusta</button>'
            }



            var html = '<article>';
            html += '<div class="row">';
            html += '<div class="col-sm-6 col-md-6">';
            html += '<img src="' + img + '" alt="..." class="img-thumbnail">';
            html += '</div>';
            html += '<div class="col-sm-6 col-md-6">';
            html += '<div class="thumbnail">';
            html += '<div class="caption" data-id="' + id + '" data-title="' + title + '">';
            html += '<img src="' + authorimg + '" alt="..." class="detail-author-img">';
            html += '<h4 class="detail-author">' + author + '</h4>';
            html += '<p class="detail-date">Fecha de publicación:' + date + '</p>';
            html += '<button type="button" id="commentsButton" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Comentarios(' + comments.length + ')</button>';
            html += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
            html += '<div class="modal-dialog" role="document">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '<h4 class="modal-title" id="myModalLabel">Comentarios</h4>';
            html += '<hr>';
            html += '<form class="form-horizontal" id="form">';
            html += '<div class="form-group">';
            html += '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
            html += '<div class="col-sm-10">';
            html += '<input type="text" class="form-control" id="inputNombre" placeholder="Nombre">';
            html += '</div>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="inputEmail" class="col-sm-2 control-label">E-mail</label>';
            html += '<div class="col-sm-10">';
            html += '<input type="email" class="form-control" id="inputEmail" placeholder="E-mail">';
            html += '</div>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="inputComment" class="col-sm-2 control-label">Comentario</label>';
            html += '<div class="col-sm-10">';
            html += '<textarea class="form-control" id="inputComment" rows="5" placeholder="Tu comentario aquí"></textarea>';
            html += '</div>';
            html += '</div>';
            html += '<button type="submit" class="btn btn-primary inputComment">Enviar</button>';
            html += '</form>';
            html += '</div>';
            html += '<div class="modal-body" id="comments">';
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += like;
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="row">';
            html += '<div class="col-sm-12 col-md-12">';
            html += '<div class="thumbnail">';
            html += '<div class="caption">';
            html += '<h3 class="detail-title">' + title + '</h3>';
            html += '<p class="detail-text">' + text + '</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</article>';

            $('.detail').append(html);

            for (i in comments){
                var comment = comments[i];
                var name = comment.name || "";
                var lastname = comment.lastname || "";
                var largetext = comment.text || "";
                var email = comment.email || "";



                var htmll = '<h4>' + name + ' ' + lastname +'</h4>';
                html += '<h6>' + email + '</h6>';
                htmll += '<p>' + largetext + '</p>';
                htmll += '<hr>';
                $('.modal-body').append(htmll);
            }
        }, function (error) {
            console.log('Error', error);
        })
    }
};