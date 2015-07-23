var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);    

app.set('io',io);	

io.on('connection', function(socket){
	console.log("conectado");
});

var server = http.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});


