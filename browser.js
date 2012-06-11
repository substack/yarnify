var path = require('path');
var parse = require('./browser/parse');
var withPrefix = require('./browser/with_prefix');

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

module.exports = function (prefix, files) {
    var elems = {};
    var cssElement = document.createElement('style');
    
    (function () {
        var sources = [];
        
        var keys = objectKeys(files);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/\.css$/i.test(key)) {
                sources.push(files[key][1]); 
            }
            else {
                elems[key] = parse(prefix, files[key]);
            }
        }
        
        var cssText = document.createTextNode(sources.join('\n'));
        cssElement.appendChild(cssText);
    })();
    
    var insertedCss = false;
    var y = function (file_, cssFiles) {
        var file = path.resolve('/', file_);
        if (!elems[file]) return undefined;
        var elem = withPrefix(prefix, elems[file].cloneNode(true));
        
        if (!cssFiles) cssFiles = [];
        if (!isArray(cssFiles)) cssFiles = [ cssFiles ];
        for (var i = 0; i < cssFiles.length; i++) {
            var cssFile = path.resolve('/', cssFiles[i])
            if (files[cssFile]) {
                var cssPrefix = files[cssFile][0];
                elem.addClass(cssPrefix);
            }
        }
        
        if (!insertedCss) {
            document.head.appendChild(cssElement);
            insertedCss = true;
        }
        return elem;
    };
    
    y.prefix = prefix;
    
    y.parse = function (src) {
        return parse(prefix, src);
    };
    
    y.files = objectKeys(files);
    
    return y;
};
