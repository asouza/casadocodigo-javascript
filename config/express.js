var express = require('express');
var app = express();

console.log(module.exports+" Conteudo da variavel/funcao exports");

module.exports = function() {
    var app = express();

    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views','./views');

    return app;
};
