module.exports = function withPrefix (prefix, elem) {
    function wrap (e) {
        if (!e) return e
        if (e && e.length) {
            for (var i = 0; i < e.length; i++) {
                e[i] = withPrefix(prefix, e[i]);
            }
        }
        if (e.pre === prefix) return e;
        
        return withPrefix(prefix, e);
    }
    
    elem.pre = prefix;
    
    elem.getElementById = function (id) {
        return wrap(document.getElementById(prefix + id));
    };
    
    elem.getElementsByClassName = function (name) {
        return wrap(document.getElementsByClassName(prefix + name));
    };
    
    var querySelector = elem.querySelector;
    elem.querySelector = function (sel) {
        var s = sel.replace(/([.#])([^.\s])/g, function (_, op, c) {
            return op + prefix + c;
        });
        return wrap(querySelector.call(this, s));
    };
    
    var querySelectorAll = elem.querySelectorAll;
    elem.querySelectorAll = function (sel) {
        var s = sel.replace(/([.#])([^.\s])/g, function (_, op, c) {
            return op + prefix + c;
        });
        return wrap(querySelectorAll.call(this, s));
    };
    
    return elem;
};
