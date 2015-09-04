var controller = require('../controllers/produtos')();

module.exports = function(app) {
    app.get("/produtos/form",controller.form);
    app.post("/produtos",controller.salva);
    app.get("/produtos",controller.lista);
    app.get("/produtos/:id",controller.buscaPorId);
}