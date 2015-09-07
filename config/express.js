var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {

    var app = express();

    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.use("/produtos/:id",function (req, res, next) {
        //if(!req.query.logado){
        //    res.status(401).send("nao autorizado");
        //    return ;
        //}
        next();
    });

    load('routes',{cwd: 'app',verbose:true})
        .then('infra')
        .into(app);

    return app;
};
