var controller = require('../controllers/home')();
module.exports = function(app) {
    console.log(controller.index);
    app.get("/",controller.index)
}