var fragment = require("fragment");
var path = require('path');

var yarnify = module.exports = function (file) {
    var file_ = path.resolve('/', file);
    var html = yarnify.files[file_];
    if (!html) return undefined;
    // todo: intelligently bind scoped css
    return fragment(html);
};
