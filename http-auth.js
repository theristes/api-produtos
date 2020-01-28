const basicAuth = require('express-basic-auth')

function Authorization(connection) {


    function validaUsuario(username, password, cb) {
    
        connection.query(`select * from clientes where login = "${username}"`, (error, results, fields) => {
        
        const { login, senha  } = results[0];
      
        if (error)
          return cb(null, false)
        else 
          return cb(null, basicAuth.safeCompare(password, senha))
       });
    }
    

    return  { auth : basicAuth({
        authorizer: validaUsuario,
        authorizeAsync: true,
    }) };

}


module.exports = Authorization;