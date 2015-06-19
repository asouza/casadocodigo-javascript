module.exports = function(app) {

    app.livroDao = function(connection) {
        this.salva = function(livro,callback){
            connection.query('INSERT INTO livros SET ?', livro, function(err, result) {
                if(callback){
                    callback(err,result);
                }
            });
        }
        return this;
    }
}