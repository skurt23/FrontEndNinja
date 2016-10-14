/**
 * Created by skurt on 14/10/16.
 */
var $ = require('jquery');
var moment = require('moment');

$(document).ready(function(){
    updateDate();
    setInterval(updateDate, 1000);
});

function updateDate() {
    $('article time.date').each(function(){
        $(this).text(
            moment($(this).attr("datetime")).fromNow()
        );
    });
}

