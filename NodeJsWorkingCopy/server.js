/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

//load users route
var users = require('./routes/users');
var graphdata = require('./routes/graphdata');
var requestdata = require('./routes/requestdata');
var processdata = require('./routes/processdata');
var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(

    connection(mysql, {

        host: '10.10.10.62',
        user: 'cds',
        password: 'osicpl123',
        port: 3306, //port mysql
        database: 'cds_demo'

    }, 'pool') //or single

);



app.get('/', routes.index);
app.post('/users', users.authenticateuser);
app.get('/users/statistics', users.statistics);
app.post('/users/register', users.register);
app.get('/users/changepassword', users.changepassword);
app.get('/users/forgotpassword', users.forgotpassword);
app.get('/graphdata/statusreport', graphdata.statusreport);
app.get('/graphdata/categoryreport', graphdata.categoryreport);
app.get('/graphdata/locationreport', graphdata.locationreport);
app.get('/graphdata/moodfactorreport', graphdata.moodfactorreport);
app.get('/graphdata/citizentrendsreport', graphdata.citizentrendsreport);
app.get('/graphdata/topratedrequestsreport/:id', graphdata.topratedrequestsreport);
app.get('/graphdata/myproirityrequestreport/:id', graphdata.myproirityrequestreport);
app.get('/graphdata/mystatusrequestreport/:id', graphdata.mystatusrequestreport);
app.get('/graphdata/totalrequestcount', graphdata.totalrequestcount);
app.post('/requestdata/mypostrequests', requestdata.mypostrequests);
app.post('/requestdata/postvotes', requestdata.postvotes);
app.post('/requestdata/mymoods', requestdata.mymoods);
app.post('/requestdata/moodperrequestpercentage', requestdata.moodperrequestpercentage);
app.post('/requestdata/moodoveralltpercentage', requestdata.moodoveralltpercentage);
app.post('/processdata/getrequesthistory', processdata.getrequesthistory);
app.post('/processdata/getrequestusercomments', processdata.getrequestusercomments);
app.post('/processdata/postcommentsforrequest', processdata.postcommentsforrequest);

app.get('/requestdata/usersuccessstories', requestdata.usersuccessstories);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
