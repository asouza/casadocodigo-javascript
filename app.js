var app = require('./config/express')();
var produtos = require("./app/routes/produtos")(app);
var home = require('./app/routes/home')(app);
var promocoes = require('./app/routes/promocoes')(app);

var http = require('http').Server(app);
var io = require('socket.io')(http);    

app.set('io',io);	

var server = http.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});


