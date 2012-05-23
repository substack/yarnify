var fs = require('fs');
var findit = require('findit');

exports.knit = function (dir, cb) {
    var files = {};
    var finder = findit(dir);
    var pending = 0;
    var done = false;
    
    finder.on('file', function (file) {
        if (!/\.(html|css)$/.test(file)) return;
        
        var shortFile = file.slice(dir.length);
        pending ++;
        fs.readFile(file, 'utf8', function (err, src) {
            pending --;
            if (err) return;
            files[shortFile] = src;
            if (done && pending === 0) withFiles(files, cb);
        });
    });
    
    finder.on('end', function () {
        done = true;
    });
};

var prelude = fs.readFileSync(__dirname + '/browser.js', 'utf8');
function withFiles (files, cb) {
    var src = "module.exports = require('yarnify')("
        + JSON.stringify(files) + ');\n';
    cb(null, src);
}
