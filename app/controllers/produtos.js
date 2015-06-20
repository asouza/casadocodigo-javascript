var util = require('util')

module.exports = function(app) {
    var controller = {};
    controller.form = function(req, res) {
        res.render('produtos/form');
    };

    controller.salva = function(req,res) {
        var livro = req.body;

        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco','Preco deve ser um número').isFloat();

        var errors = req.validationErrors();
        if(errors){
            res.status(400).send(util.inspect(errors));
            return ;
        }

        var connection = app.connectionFactory();
        //precisa disso? tem algum jeito mais facil?
        livro.preco = req.sanitize("preco").toFloat();

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