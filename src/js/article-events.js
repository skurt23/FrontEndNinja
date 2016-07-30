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

$(".article-list").on("click", ".comments", function(){
    console.log($('#getID').parent().data('id'));

    var id = $(this).parent().parent().data('id');
    var comments = true;
    var url = "../../detail.html" + "?comment=" + comments + "&id=" + id;
    $(this).attr('href', url);

});

$(".article-list").on("click", ".title", function(){
    console.log('lo detecta  bien');

    var id = $(this).parent().data('id');
    var url = "../../detail.html" + "?id=" + id;
    $(this).attr('href', url);

});

$(".detail").on("click", "#like", function(){
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

$('.detail').on('submit', '.form-horizontal', function () {

    var inputs = $('.form-horizontal input');
    var textarea = $('.form-horizontal textarea')[0];

    if (textarea.value === ''){
        alert('Debe escribir un comentario.');
        textarea.focus();
        return false;
    }
    console.log(textarea.value.split(' ').length);
    if (textarea.value.split(' ').length > 120) {
        alert('Máximo de 120 palabras por comentario');
        textarea.focus();
        return false;
    }
    for (var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        if (input.value === '' || input.checkValidity() == false){
            if (input == inputs[0]){
                alert('Debe introducir un nombre. Ej: Juan');
                input.focus();
                return false;
            }else if(input == inputs[1]) {
                alert('Debe introducir un email. Ej: abcd@gmail.com');
                input.focus();
                return false;
            }
        }


    }
    return false;
});

