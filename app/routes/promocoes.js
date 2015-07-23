module.exports = function(app) {
    var controller = app.controllers.promocoes;
    app.get("/promocoes/nova", controller.form);
    app.post("/promocoes", controller.salva);
    
}