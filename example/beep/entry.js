var domready = require('domready');
var widget = require('./widget');

domready(function () {
    var wr = widget('robots');
    wr.body('in SPACE!');
    wr.appendTo(document.body);
    
    var wd = widget('dinosaurs');
    wd.body('extinction');
    wd.appendTo(document.body);
    
    var ix = 1;
    setInterval(function () {
        wd.body('extinction ' + Array(++ix).join('.'));
    }, 250);
});
