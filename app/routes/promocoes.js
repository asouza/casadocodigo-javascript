module.exports = function(app) {
    var controller = app.controllers.promocoes;
    app.get("/promocoes",controller.salva);
}