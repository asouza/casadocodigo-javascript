function ProdutoDao(connection) {
    this._connection = connection;
}

ProdutoDao.prototype.salva = function(livro,callback) {
    this.connection.query('INSERT INTO livros SET ?', livro, callback);
}

ProdutoDao.prototype.lista = lista = function(callback) {
    connection.query('select * from livros',callback);
}

ProdutoDao.prototype.buscaPorId = function (id,callback) {
    connection.query("select * from livros where id = ?",[id],callback);
}
module.exports = function(app) {
    return ProdutoDao;
}