module.exports = function (src) {
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
};
