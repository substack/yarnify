var domready = require('domready');
var widget = require('../widget');

domready(function () {
    var r = widget('robots');
    r.body('in SPACE!');
    r.appendTo(document.body);
    
    var ri = 1;
    setInterval(function () {
        r.body(r.body() + Array(ri++).join('!'));
    }, 250);
    
    var d = widget('dinosaurs');
    d.body('in the ground');
    d.appendTo(document.body);
    
    var di = 1;
    setInterval(function () {
        r.body(r.body() + Array(di++).join('.'));
    }, 250);
});
