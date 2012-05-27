var yarn = require('./yarn');

module.exports = function (title) {
    var elem = yarn('beep.html');
    elem.querySelector('.title').textContent = title;
    
    return {
        body : function (x) {
            elem.querySelector('.body').textContent = x;
            return elem;
        },
        appendTo : function (e) {
            e.appendChild(elem);
            return elem;
        }
    };
};
