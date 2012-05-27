var domready = require('domready');

domready(function () {
    var widget = require('./widget');
    var w = widget('robots');
    w.body('in SPACE!');
    w.appendTo(document.body);
});
