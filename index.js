var fs = require('fs');
var path = require('path');

var findit = require('findit');
var insertPrefix = require('css-prefix');
var commondir = require('commondir');

exports.knit = function (dirs_, opts, cb) {
    var dirs = Array.isArray(dirs_) ? dirs_ : [ dirs_ ];
    
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    
    var files = {};
    var pending = dirs.length;
    
    var prefix = '_' + Math.random().toString(16).slice(2) + '-';
    
    dirs.forEach(function (dir_) {
        var dir = path.resolve(dir_);
        
        knit(prefix, dir, function (err, files_) {
            if (err) return cb(err);
            
            Object.keys(files_).forEach(function (file) {
                files[file] = files_[file];
            });
            if (--pending > 0) return;
            
            var basedir = opts.base || commondir(Object.keys(files)) + '/';
            
            var normFiles = Object.keys(files)
                .reduce(function (acc, file_) {
                    var file = file_;
                    if (file_.slice(0, basedir.length) === basedir) {
                        file = file_.slice(basedir.length - 1);
                    }
                    acc[file] = files[file_];
                    return acc;
                }, {})
            ;
            withFiles(prefix, normFiles, cb);
        });
    });
};

function knit (prefix, dir, cb) {
    var files = {};
    var finder = findit(dir);
    var pending = 0;
    var done = false;
    
    finder.on('file', function (file) {
        if (!/\.(html|css)$/.test(file)) return;
        
        pending ++;
        fs.readFile(file, 'utf8', function (err, src) {
            pending --;
            if (err) return;
            
            if (/\.css$/.test(file)) {
                var opts = {
                    prefix : prefix,
                    elementClass : prefix.slice(0,-1),
                };
                files[file] = insertPrefix(opts, src);
            }
            else files[file] = src;
            if (done && pending === 0) cb(null, files);
        });
    });
    
    finder.on('end', function () {
        done = true;
    });
};

function withFiles (prefix, files, cb) {
    var src = 'module.exports = require("yarnify")('
        + JSON.stringify(prefix)
        + ','
        + JSON.stringify(files)
    + ');\n';
    cb(null, src);
}
