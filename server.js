const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const Produto = require('./produto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 2888); 

const connection = mysql.createConnection({
    host     : 'coopersoft.com.br',
    user     : 'coope904_api',
    password : 'api2020',
    database : 'coope904_api'
  });

connection.connect();

const produto = Produto(connection);

app.post('/produto/', produto.insert);
app.put('/produto/:id', produto.update);
app.delete('/produto/:id', produto.remove);
app.get('/produto/', produto.selectAll); 
app.get('/produto/:ean',produto.select)


const http = require('http');
const server = http.createServer(app);

server.on('close',() => connection.end());

server.listen(app.get('port'), () => console.log(`- Serviço está ativado na porta: ${app.get('port')} \n`));
