/**
 * Created by Skurt on 28/7/16.
 */
var $ = require('jquery');
var requests = require('./requests');

module.exports = {

    load: function () {
        requests.list(function (response) {
            $('#row').html(''); // vaciamos la lista
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
                var comments = article.comments.split(' , ');
                var length = comments.length;
                var like;

                function isFavorite(articleId) {


                    var item = localStorage.getItem(articleId);


                    if (item === null) {
                        return false
                    } else {
                        return true
                    }
                }

                if (isFavorite(id) === true) {
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
                html += '<a href="../../detail.html" class="comments">Comentarios(' + length + ')</a>';
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
        requests.detail(5, function (response) {
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
            var comments = article.comments.split(' , ');
            var length = comments.length;


            var html = '<article>';
            html += '<div class="row">';
            html += '<div class="col-sm-6 col-md-6">';
            html += '<img src="' + img + '" alt="..." class="img-thumbnail">';
            html += '</div>';
            html += '<div class="col-sm-6 col-md-6">';
            html += '<div class="thumbnail">';
            html += '<div class="caption">';
            html += '<img src="' + authorimg + '" alt="..." class="detail-author-img">';
            html += '<h4 class="detail-author">' + author + '</h4>';
            html += '<p class="detail-date">Fecha de publicación:' + date + '</p>';
            html += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Comentarios(' + length + ')</button>';
            html += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
            html += '<div class="modal-dialog" role="document">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '<h4 class="modal-title" id="myModalLabel">Comentarios</h4>';
            html += '<hr>';
            html += '<form class="form-horizontal">';
            html += '<div class="form-group">';
            html += '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
            html += '<div class="col-sm-10">';
            html += '<input type="text" class="form-control" id="inputNombre" placeholder="Nombre">';
            html += '</div>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="inputApellidos" class="col-sm-2 control-label">Apellidos</label>';
            html += '<div class="col-sm-10">';
            html += '<input type="text" class="form-control" id="inputApellidos" placeholder="Apellidos">';
            html += '</div>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<label for="inputComment" class="col-sm-2 control-label">Comentario</label>';
            html += '<div class="col-sm-10">';
            html += '<textarea class="form-control" id="inputComment" rows="5" placeholder="Tu comentario aquí"></textarea>';
            html += '</div>';
            html += '</div>';
            html += '<button type="submit" class="btn btn-primary inputComment">Enviar</button>';
            html += '</div>';
            html += '<div class="modal-body" id="comments">';
            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
            html += '<button type="button" class="btn btn-primary">Save changes</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<button class="btn btn-primary like">Me gusta</button>';
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
                var comment = JSON.stringify(comments[i]);
                var parsed = JSON.parse(comment);
                console.log(parsed.name);

                var htmll = '<h4>' + parsed.name + ' ' + parsed.lastname +'</h4>';
                htmll += '<p>' + parsed.text + '</p>';
                $('.modal-body').append(htmll);
            }
        }, function (error) {
            console.log('Error', error);
        })
    }
};