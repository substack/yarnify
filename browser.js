var path = require('path');
var parse = require('./browser/parse');

module.exports = function (prefix, files) {
    var elems = Object.keys(files).reduce(function (acc, file) {
        acc[file] = parse(prefix, files[file]);
        return acc;
    }, {});
    
    var y = function (file) {
        var file_ = path.resolve('/', file);
        return elems[file_];
    };
    
    y.parse = function (src) {
        return parse(prefix, src);
    };
    
    y.files = Object.keys(files);
    
    return y;
};
