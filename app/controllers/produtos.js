var validator = require('validator');

module.exports = function(app) {
    var controller = {};
    controller.form = function(req, res) {
        res.render('produtos/form');
    };

    controller.salva = function(req,res) {
        var livro = req.body;

        if(!validator.isLength(livro.titulo,5,10)){
            res.status(400).send("titulo invalido");
            return;
        }
        if(!validator.isFloat(livro.preco)){
            res.status(400).send("preco deve ser um numero");
            return ;
        }

        var connection = app.connectionFactory();
        //precisa disso? tem algum jeito mais facil?
        livro.preco = Number(livro.preco);

        var tx = connection.beginTransaction(function(exception){
            var livroDao = new app.livroDao(connection);

            livroDao.salva(livro,function(exception,result){

                connection.commit(function(err) {
                    console.log("comitando");
                });

            });

        });
        res.redirect("/produtos");
    };

    controller.lista = function(req,res) {

        var connection = app.connectionFactory();
        connection.beginTransaction(function(ex){
            var livroDao = new app.livroDao(connection);
            livroDao.lista(function(error,results,fields){
                console.log("chegando aqui4");

                var accept = req.accepts(['html', 'json']);

                res.format({
                    html: function(){
                        res.render("produtos/lista",{lista:results});
                    },
                    json: function(){
                        res.json(results);
                    }
                });

                connection.commit();

            })
        });
    }
    return controller;
}