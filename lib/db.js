var sequelize = require('sequelize'),
	fs = require('fs');

exports.setupDB = function(config){
	var db = new sequelize(config.db.db, config.db.username, config.db.password, config.db.options);
	app.set('db', db);

	// Load models, link to app
	fs.readdirSync(__dirname + '/../' + config.server.models.directory)
	.forEach(function(file) {
		var modelName = 'model_' + file.split('.')[0]; // namespace models
		app.set(modelName, db.import(__dirname + '/../' + config.server.models.directory + '/' + file));
	});
};

exports.setupAssociations = function(){
	// Set up associations
	// TODO: make use of linking tables

	// var test = app.get('test'),
	//     user = app.get('user');
	// test.hasOne(user);

	// app.set('test', test);
	// app.set('user', user);
};