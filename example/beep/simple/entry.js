var domready = require('domready');
var widget = require('../widget');

domready(function () {
    var w = widget('robots');
    w.body('in SPACE!');
    w.appendTo(document.body);
});
