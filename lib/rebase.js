var commondir = require('commondir');

module.exports = function (files, re) {
    return commondir(Object.keys(files)
        .filter(function (x) { return re.test(x) })
        .map(path.dirname)
    ) + '/';
};
