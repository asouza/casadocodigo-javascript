module.exports = function(app) {
    var controller = {};
    controller.index = function(req, res) {
        res.render('home/index', {nome: 'Express'});
    };
    return controller;
}