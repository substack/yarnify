var widget = require('./widget');
var w = widget('robots');
w.children[1].textContent = 'in SPACE!';
document.body.appendChild(w);