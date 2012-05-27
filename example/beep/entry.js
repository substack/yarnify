var domready = require('domready');
var widget = require('./widget');

domready(function () {
    var wr = widget('robots');
    wr.body('in SPACE!');
    wr.appendTo(document.body);
    
    var wd = widget('dinosaurs');
    wd.body('WELDING cars');
    wd.appendTo(document.body);
    wd.body('???');
    
    var ix = 1;
    setInterval(function () {
        wd.body('WELDING cars ' + Array(ix++).join('.'));
    }, 1000);
});
