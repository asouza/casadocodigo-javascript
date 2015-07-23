module.exports = function(app) {
    var controller = app.controllers.promocoes;
    app.get("/promocoes/form", controller.form);
    app.post("/promocoes", controller.salva);
    
}