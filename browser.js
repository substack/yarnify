var path = require('path');
var parse = require('./browser/parse');
var clone = require('./browser/clone');

module.exports = function (prefix, files) {
    var cssFiles = [];
    var elems = {};
    Object.keys(files).forEach(function (file) {
        if (/\.css$/i.test(file)) {
            cssFiles.push(files[file]); 
        }
        else {
            elems[file] = parse(prefix, files[file]);
        }
    });
    var css = document.createElement('style');
    var cssText = document.createTextNode(cssFiles.join('\n'));
    css.appendChild(cssText);
    var insertedCss = false;
    
    var y = function (file_, opts) {
        if (!opts) opts = {};
        var file = path.resolve('/', file_);
        var elem = elems[file];
        
        if (opts.css !== false && !insertedCss) {
            document.head.appendChild(css);
            insertedCss = true;
        }
        return clone(elem);
    };
    
    y.parse = function (src) {
        return parse(prefix, src);
    };
    
    y.files = Object.keys(files);
    
    return y;
};
