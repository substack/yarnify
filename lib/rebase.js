var commondir = require('commondir');
var path = require('path');

module.exports = function (files, re) {
    return commondir(Object.keys(files)
        .filter(function (x) { return re.test(x) })
        .map(path.dirname)
    ) + '/';
};
