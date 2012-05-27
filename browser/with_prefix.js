module.exports = function (prefix, elem) {
    elem.getElementById = function (id) {
        return document.getElementById(prefix + id);
    };
    
    elem.getElementsByClassName = function (name) {
        return document.getElementsByClassName(prefix + name);
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
