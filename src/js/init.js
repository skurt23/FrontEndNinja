/**
 * Created by Skurt on 28/7/16.
 */
var $ = require('jquery');
var article = require('./article-manager');
var utils = require('./utils');
var urlComment = utils.getUrlVars()['comment'];
var urlID = utils.getUrlVars()['id'];

if (window.location.pathname === '/detail.html' && typeof urlComment === 'undefined'){
    console.log(urlID)
    article.loadDetail(urlID);
}else if (window.location.pathname == '/' || window.location.pathname == '/index.html'){
    article.load();
}else if (urlComment){
    console.log(urlID);
    article.loadDetail(urlID);
    setTimeout(function(){$('#myModal').modal('show');}, 1000);
}


