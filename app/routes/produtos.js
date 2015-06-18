module.exports = function(app) {
    var controller = app.controllers.produtos;

    app.get("/produtos/form",controller.form)
    app.post("/produtos",controller.salva)
}