module.exports = function (prefix, parsed) {
    var doc = parsed.document;
    var elem = parsed.element;
    
    elem.getElementById = function (id) {
        return doc.getElementById(prefix + id);
    };
    
    elem.getElementsByClassName = function (name) {
        return doc.getElementsByClassName(prefix + name);
    };
    
    var querySelector = elem.querySelector;
    elem.querySelector = function (sel) {
        var s = sel.replace(/([.#])([^.\s])/g, function (_, op, c) {
            return op + prefix + c;
        });
        return querySelector.call(this, s);
    };
    
    var querySelectorAll = elem.querySelectorAll;
    elem.querySelectorAll = function (sel) {
        var s = sel.replace(/([.#])([^.\s])/g, function (_, op, c) {
            return op + prefix + c;
        });
        return querySelectorAll.call(this, s);
    };
    
    return elem;
};
