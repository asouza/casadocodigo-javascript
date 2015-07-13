var assert = require("assert")
var request = require('supertest');

describe('Array', function() {

    before(function() {
        console.log("rodando algo antes de tudo");
    });

    beforeEach(function() {
        console.log("rodando algo antes de cada funcao");
    });


    describe('#indexOf()', function () {
        it('testando listagem', function (done) {
            request("http://localhost:3000")
                .get('/produtos')
                .expect(200)
                .end(function(err,res){
                    if (err) throw err;
                    console.log(res.text);
                    done();
                });

        });
    });

});