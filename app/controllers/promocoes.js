module.exports = function(app,socketIo) {
    var controller = {};

    controller.salva = function(req,res) {
        socketIo.emit("novaPromocao",{id:17});
        res.render('produtos/form',{validationErrors:[]});        
    };


    return controller;
}