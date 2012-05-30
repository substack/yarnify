var yarn = require('./yarn');

module.exports = function (title) {
    var elem = yarn('beep.html');
    elem.querySelector('.title').textContent = title;
    
    return {
        body : function (x) {
            var body = elem.querySelector('.body');
            if (x === undefined) return body.textContent;
            body.textContent = x;
        },
        appendTo : function (e) { e.appendChild(elem) }
    };
};
