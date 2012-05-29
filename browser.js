var path = require('path');
var parse = require('./browser/parse');
var withPrefix = require('./browser/with_prefix');

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
        if (!elems[file]) return undefined;
        
        var elem = withPrefix(prefix, elems[file].cloneNode(true));
        
        if (opts.css !== false && !insertedCss) {
            document.head.appendChild(css);
            insertedCss = true;
        }
        return elem;
    };
    
    y.parse = function (src) {
        return parse(prefix, src);
    };
    
    y.files = Object.keys(files);
    
    return y;
};
