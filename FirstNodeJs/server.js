var http = require("http");
var express = require('express');
var path = require('path');
var app = express();
var start = require('./start');
var databaseLogin=require('./database/login');


var connection = require('express-myconnection');
var mysql = require('mysql');




// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(

    connection(mysql, {

        host: '192.168.24.162',
        user: 'root',
        password: 'root',
        port: 3306, //port mysql
        database: 'test'

    }, 'pool') //or single

);

app.get('/', start.index);
app.post('/validatelogin', databaseLogin.authenticateuser);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});