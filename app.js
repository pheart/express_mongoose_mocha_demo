var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webRouter = require('./routes/webRouter');
var Codes = require('./errors/code');

var app = express();
var env = process.env.NODE_ENV;

/**
 * connect mongoose
 */
require('./connect')(app);

/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * logger
 */
if (env == 'production') {
	var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log')
	app.use(logger('combined', {stream: accessLogStream}))
} else {
	app.use(logger('dev'));
}

/**
 * uncomment after placing your favicon in /public
 */
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * set routers
 */
app.use('/', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * error handler
 */
app.use((err, req, res, next) => {
	if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
		res.status(200).json({code: err.code || Codes.ERROR_CODE, message: err.message});
	} else {
		res.locals.message = err.message;
		res.locals.error = err;
		res.status(err.status || 500);
		res.render('error');
	}
});

module.exports = app;
