var yarn = require('./yarn');

module.exports = function (title) {
    var frag = yarn('./beep.html');
    var rootNode = frag.firstChild;
    rootNode.firstElementChild.textContent = title;
    
    return rootNode
};