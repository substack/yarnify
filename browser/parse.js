var withPrefix = require('./with_prefix');
var createDocument = require('./create_document');

module.exports = function (prefix, src) {
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
};
