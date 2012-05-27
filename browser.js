var path = require('path');
var withPrefix = require('./lib/with_prefix');

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
    
    return y;
};

function parse (prefix, src) {
    var parsed = createDocument(src);
    var doc = parsed.document;
    var elem = parsed.element;
    
    var nodes = elem.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var c = node.getAttribute('class');
        if (c) {
            node.setAttribute('class', c.split(/\s+/)
                .map(function (x) { return  prefix + x })
                .join(' ')
            );
        }
        
        var id = node.getAttribute('id');
        if (id) node.setAttribute('id', prefix + id);
    }
    
    return withPrefix(prefix, parsed);
}

function createDocument (src) {
    var doc;
    try {
        var d = new DOMParser;
        doc = d.parseFromString(src, 'text/html');
    }
    catch (e) {}
    
    if (!doc) {
        doc = document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = src;
    }
    return { document : doc, element : doc && doc.documentElement };
}
