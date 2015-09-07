function LivroDao(connection) {
    this._connection = connection;
}

LivroDao.prototype.salva = function(livro,callback) {
    this._connection.query('INSERT INTO livros SET ?', livro, callback);
}

LivroDao.prototype.lista = lista = function(callback) {
    this._connection.query('select * from livros',callback);
}

LivroDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from livros where id = ?",[id],callback);
}

module.exports = function(){return LivroDao};