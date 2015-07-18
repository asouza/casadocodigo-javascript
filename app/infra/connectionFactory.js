var mysql  = require('mysql');

module.exports = function() {
        return function(){             	
        	if(!process.env.NODE_ENV){
	            return mysql.createConnection({
	                host     : 'localhost',
	                user     : 'root',
	                password : '',
	                database : 'casadocodigo_nodejs'
	            });
        	}

        	if(process.env.NODE_ENV == 'test'){        		
	            return mysql.createConnection({
	                host     : 'localhost',
	                user     : 'root',
	                password : '',
	                database : 'casadocodigo_nodejs_teste'
	            });
        	}        	
        };
}