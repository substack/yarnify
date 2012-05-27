module.exports = function (elem) {
    var clone = elem.cloneNode(true);
    clone.pre = elem.pre;
    clone.getElementById = elem.getElementById;
    clone.getElementsByClassName = elem.getElementsByClassName;
    clone.querySelector = elem.querySelector;
    clone.querySelectorAll = elem.querySelectorAll;
    return clone;
};
