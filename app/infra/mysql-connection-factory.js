var mysql  = require('mysql');

module.exports = function(app) {

    app.connectionFactory = function() {
        return mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        })
    };
}