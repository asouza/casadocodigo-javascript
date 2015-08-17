module.exports = function(app) {
    var controller = {};
    controller.form = function(req, res) {
        res.render('produtos/form',{validationErrors:[]});
    };

    controller.salva = function(req,res) {
        var livro = req.body;

        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco','Preco deve ser um número').isFloat();

        var errors = req.validationErrors();
        if(errors){
            res.format({
               html: function(){
                   res.status(400).render("produtos/form",{validationErrors:errors});
               },
               json: function(){
                   res.status(400).send(errors);
               }
            });
            return ;
        }

        var connection = app.infra.connectionFactory();
        //precisa disso? tem algum jeito mais facil?
        livro.preco = req.sanitize("preco").toFloat();


        var livroDao = new app.infra.livroDao(connection);


        livroDao.salva(livro,function(exception,result){
            if(!exception) {
                res.redirect("/produtos");
            }
        });

        connection.end();


    };

    var sleep = require('sleep');
    var cont = 0;
    controller.lista = function(req,res) {

        console.log("chegou aqui..."+(cont++));
        sleep.sleep(10);
        console.log("passou a espera")
        var connection = app.infra.connectionFactory();

            var livroDao = new app.infra.livroDao(connection);
            livroDao.lista(function(error,results,fields){


                var accept = req.accepts(['html', 'json']);
                console.log("olha eu aqui");
                res.format({
                    html: function(){
                        res.render("produtos/lista",{lista:results});
                    },
                    json: function(){
                        res.json(results);
                    }
                });

            })
        connection.end();
    }

    controller.buscaPorId = function(req,res) {
        var connection = app.infra.connectionFactory();
        var livroDao = new app.infra.livroDao(connection);

        livroDao.buscaPorId(req.params.id,function(error,results,fields){
            if(results.length == 0){
                res.status(404).send();
                return ;
            }
            res.json(results);
        });

        connection.end();
    }
    return controller;
}