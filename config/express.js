var express = require('express');
var app = express();

module.exports = function() {
    var app = express();

    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    return app;
};
