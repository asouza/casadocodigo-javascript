module.exports = function(app) {
    var controller = {};
    controller.form = function(req, res) {
        res.render('produtos/form');
    };

    controller.salva = function(req,res) {
        var livro = req.body;
        console.log(livro);

        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco','Preco deve ser um número').isFloat();

        var errors = req.validationErrors();
        if(errors){
            res.status(400).send(errors);
            return ;
        }

        var connection = app.infra.connectionFactory;
        //precisa disso? tem algum jeito mais facil?
        livro.preco = req.sanitize("preco").toFloat();

        var tx = connection.beginTransaction(function(exception){
            var livroDao = new app.infra.livroDao(connection);

            livroDao.salva(livro,function(exception,result){
                if(!exception) {
                    res.redirect("/produtos");
                }

                connection.commit(function(err) {
                    console.log("comitando");
                });

            });

        });
    };

    controller.lista = function(req,res) {

        var connection = app.infra.connectionFactory;
        connection.beginTransaction(function(ex){
            var livroDao = new app.infra.livroDao(connection);
            console.log(livroDao);
            livroDao.lista(function(error,results,fields){


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

    controller.buscaPorId = function(req,res) {
        var connection = app.infra.connectionFactory;
        var livroDao = new app.infra.livroDao(connection);

        livroDao.buscaPorId(req.params.id,function(error,results,fields){
            if(results.length == 0){
                res.status(404).send();
                return ;
            }
            res.json(results);
            connection.end();
        });
    }
    return controller;
}