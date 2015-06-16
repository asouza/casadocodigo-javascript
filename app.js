var app = require('./config/express')();

app.get('/', function (req, res) {
    res.render('pages/index', {
        nome2: "alberto luiz"
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
