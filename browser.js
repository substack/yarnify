var $ = require('jquery-browserify');
var path = require('path');

var yarnify = module.exports = function (files) {
    return function (file) {
        var file_ = path.resolve('/', file);
        var html = files[file_];
        if (!html) return undefined;
        // todo: intelligently bind scoped css
        return $(html);
    };
};
