
/**
 * Module dependencies.
 */

// Core, external modules
var express = require('express'),
	http = require('http'),
	path = require('path'),
	enrouten = require('express-enrouten'),
	consolidate = require('consolidate'),
	passport = require('passport');

// Our own modules
var config = require('./config/development.conf.js'),
	db = require('./lib/db');

// Make app global
app = express();

// Authentication requires app global
db.setupDB(config);
var auth = require('./lib/auth');
auth.setupAuth();

// Give access to authentication for arbitrary routes without importing in each file
app.set('ensureAuthenticated', auth.ensureAuthenticated);

// all environments
app.set('port', config.server.port);
if (config.server.views.extension === 'dust'){
	var dust = require('dustjs-linkedin');
	app.engine('dust', consolidate.dust);
}
app.set('views', path.join(__dirname, config.server.views.directory));
app.set('view engine', config.server.views.extension);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(enrouten({ directory: config.server.controllers.directory }));
app.use(require('stylus').middleware(path.join(__dirname, config.server.assets.directory)));
app.use(express.static(path.join(__dirname, config.server.assets.directory)));

// development only
if (config.server.debug) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
