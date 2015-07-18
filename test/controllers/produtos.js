var express = require('../../config/express')()
var assert = require("assert");
var request = require('supertest')(express);
var should = require('should');

describe('#ProdutosController', function() {

    var limpaTabelas = function(done) {
        var conn = express.infra.connectionFactory();
        conn.query("delete from livros",function(ex,result){
            if(!ex) {
                done();
            }
        });        
    }

    beforeEach(function(done) {        
        limpaTabelas();
    });


    it('#listagem de produtos json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done)

    });

    it('#listagem de produtos html', function (done) {
        request.get('/produtos')
            .expect('Content-Type', /html/)
            .expect(200,done)

    });

    it('#cadastro de um novo produto com tudo preenchido', function (done) {
        request.post('/produtos')
            .send({titulo:"novo livro",preco:20.50,descricao:"livro de teste"})
            .expect(302)
            .end(function(err,response){

                done();
            })

    });

    it('#cadastro de um novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({titulo:"",descricao:"livro de teste"})
            .expect(400,done)

    });




});