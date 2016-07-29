/**
 * Created by Skurt on 28/7/16.
 */
var article = require('./article-manager');

if (window.location.pathname == '/detail.html'){
    article.loadDetail();
}else if (window.location.pathname == '/' || window.location.pathname == '/index.html'){
    article.load();
}


