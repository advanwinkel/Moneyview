
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

port = process.env.PORT || 3000;

require('./app_api/models/db');

// all environments
//app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'angularjs')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./app_api/routes')(app);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
