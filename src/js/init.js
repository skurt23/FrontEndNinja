/**
 * Created by Skurt on 28/7/16.
 */
var $ = require('jquery');
var article = require('./article-manager');
var utils = require('./utils').getUrlVars()['comment'];

console.log(typeof utils === 'undefined');
console.log(window.location.pathname);

if (window.location.pathname === '/detail.html' && typeof utils === 'undefined'){
    console.log('conseguido');
    article.loadDetail();
}else if (window.location.pathname == '/' || window.location.pathname == '/index.html'){
    console.log('entra mal');
    article.load();
}else if (utils){
    console.log('peor');
    article.loadDetail();
    setTimeout(function(){$('#myModal').modal('show');}, 1000);
}


