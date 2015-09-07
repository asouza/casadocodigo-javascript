module.exports = function(app) {
    app.get("/produtos/form",function(req, res) {
        res.render('produtos/form',{validationErrors:[]});
    });

    app.post("/produtos",function(req,res) {
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

        //precisa disso? tem algum jeito mais facil?
        livro.preco = req.sanitize("preco").toFloat();

        var connection = app.infra.connectionFactory();
        var livroDao = new app.infra.LivroDao(connection);


        livroDao.salva(livro,function(exception,result){
            if(!exception) {
                res.redirect("/produtos");
            }
        });

        connection.end();


    });


    app.get("/produtos",function(req,res) {

        var connection = app.infra.connectionFactory();
        var livroDao = new app.infra.LivroDao(connection);

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
    });

    app.get("/produtos/:id",function(req,res) {
        var connection = app.infra.connectionFactory();
        var livroDao = new app.infra.LivroDao(connection);

        livroDao.buscaPorId(req.params.id,function(error,results,fields){
            if(results.length == 0){
                res.status(404).send();
                return ;
            }
            res.json(results);
        });

        connection.end();
    });
}