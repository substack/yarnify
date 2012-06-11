var commondir = require('commondir');
var path = require('path');

module.exports = function (files, re) {
    var xs = Object.keys(files)
        .filter(function (x) { return re.test(x) })
        .map(path.dirname)
    ;
    if (xs.length === 0) return '/';
    return commondir(xs) + '/';
};
