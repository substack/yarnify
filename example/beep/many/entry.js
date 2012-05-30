var domready = require('domready');
var widget = require('../widget');

domready(function () {
    var r = widget('robots');
    r.body('in SPACE!');
    r.appendTo(document.body);
    
    var ri = 1;
    setInterval(function () {
        r.body(r.body() + '!');
    }, 1000);
    
    var d = widget('dinosaurs');
    d.body('in the ground');
    d.appendTo(document.body);
    
    var di = 1;
    setInterval(function () {
        d.body(d.body() + '.');
    }, 1000);
});
