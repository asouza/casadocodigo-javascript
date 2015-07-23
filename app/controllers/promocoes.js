module.exports = function(app) {
    var controller = {};

    controller.form = function(req,res) {
    	var connection = app.infra.connectionFactory();
    	var livroDao = new app.infra.livroDao(connection);

        livroDao.lista(function(error,results){
            res.render('promocoes/form',{lista:results});
        });
        
    }

    controller.salva = function(req,res) {
    	var promocao = req.body;
    	console.log(promocao);
        app.get('io').emit("novaPromocao",promocao);
        res.redirect("/promocoes/form");
    };


    return controller;
}