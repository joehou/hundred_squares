const appConfig = require('./config.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const expressSession = require('express-session');

// Express Session
const sessionValues = {
  cookie: {},
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  secret: appConfig.expressSession.secret,
};
const favicon = require('serve-favicon');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


const authentication = require('./routes/api/authentication')
var users = require('./routes/api/users');
var index = require('./routes/index');
var grids = require('./routes/api/grids');

var app = express();
mongoose.connect('mongodb://localhost/hundredsquares')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession(sessionValues))
app.use(passport.initialize())
app.use(passport.session())

// Webpack Server
if (process.env.NODE_ENV !== 'production') {
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: true,
      'errors-only': true,
    },
  }));
  app.use(webpackHotMiddleware(webpackCompiler, {
    log: console.log,
  }));
}

app.use('/api/users', users);
app.use('/api/authentication', authentication)
//app.use('/api/grids', grids);
app.use('/*', index);

//Configure passport
const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
