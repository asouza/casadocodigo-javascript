module.exports = function(app) {
    var controller = {};
    controller.form = function(req, res) {
        res.render('produtos/form');
    };

    controller.salva = function(req,res) {
        var connection = app.connectionFactory();
        var livro = req.body;
        //precisa disso? tem algum jeito mais facil?
        livro.preco = Number(livro.preco);

        var tx = connection.beginTransaction(function(exception){
            var query = connection.query('INSERT INTO livros SET ?', livro, function(err, result) {
                console.log(err);
            });

            connection.commit(function(err) {
                console.log("comitando");
            });
        });


        res.render("produtos/ok");
    };
    return controller;
}