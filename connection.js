const mysql = require('mysql');

function Connection () {
    return mysql.createConnection({
        host     : 'coopersoft.com.br',
        user     : 'coope904_api',
        password : 'api2020',
        database : 'coope904_api'
    });
}

module.exports = Connection;