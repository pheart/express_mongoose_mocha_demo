const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const Config = require('./config');

var options = { 
	server: { socketOptions: { keepAlive: 1 } }
};

mongoose.connect(Config.db, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', function(error){console.log('error:'+error.message)})
		  .on('disconnected', function(){console.log('disconnected')})
		  .once('open', function(){console.log('success');});

module.exports = (app) => {
	app.use(session({
	    store: new mongoStore({ mongooseConnection: connection }),
	    secret: 'demo',
	    saveUninitialized: true,
	    resave: false
	}));
}