var assert = require("assert")
var request = require('supertest');

describe('#ProdutosController', function() {

    before(function() {
        console.log("rodando algo antes de tudo");
    });

    beforeEach(function() {
        console.log("rodando algo antes de cada funcao");
    });



    it('#listagem de produtos json', function (done) {
        request("http://localhost:3000")
            .get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done)

    });

    it('#listagem de produtos html', function (done) {
        request("http://localhost:3000")
            .get('/produtos')
            .expect('Content-Type', /html/)
            .expect(200,done)

    });

    it('#cadastro de um novo produto com tudo preenchido', function (done) {
        request("http://localhost:3000")
            .post('/produtos')
            .send({titulo:"novo livro",preco:20.50,descricao:"livro de teste"})
            .expect(302,done)

    });

    it('#cadastro de um novo produto com dados invalidos', function (done) {
        request("http://localhost:3000")
            .post('/produtos')
            .send({titulo:"",descricao:"livro de teste"})
            .expect(400,done)

    });




});