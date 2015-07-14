var assert = require("assert")
var request = require('supertest');

describe('#ProdutosController', function() {

    before(function() {
        console.log("rodando algo antes de tudo");
    });

    beforeEach(function() {
        console.log("rodando algo antes de cada funcao");
    });



    it('#listagem de produtos', function (done) {
        request("http://localhost:3000")
            .get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done)

    });




});