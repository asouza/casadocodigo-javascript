module.exports = function(app) {

    app.livroDao = function(connection) {
        this.salva = function(livro,callback) {
            connection.query('INSERT INTO livros SET ?', livro, callback);
        }
        return this;
    }
}