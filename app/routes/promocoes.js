var controller = require('../controllers/promocoes')();
module.exports = function(app) {
    app.get("/promocoes/form", controller.form);
    app.post("/promocoes", controller.salva);
    
}