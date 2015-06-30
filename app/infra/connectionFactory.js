var mysql  = require('mysql');

module.exports = function() {
        return function(){
            return mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'casadocodigo_nodejs'
            });
        };
}