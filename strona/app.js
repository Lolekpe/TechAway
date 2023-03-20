var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require("./routes/login")
var v_login = require('./routes/v-login');
var rejestracja = require("./routes/rejestracja")
var v_rejestracja = require('./routes/v-rejestracja');
var index = require("./routes/index-s")

var app = express();
var app_sprzed = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app_sprzed.set('views', path.join(__dirname, 'views'));
app_sprzed.use(favicon());
app_sprzed.set('view engine', 'ejs');
app_sprzed.use(logger('dev'));
app_sprzed.use(bodyParser.json());
app_sprzed.use(bodyParser.urlencoded({extended: false}));
app_sprzed.use(cookieParser());
app_sprzed.use(express.static(path.join(__dirname, 'public')));

app_sprzed.use('/', index)
app.use('/', routes);
app.use('/users', users);
app.use('/login/validate', v_login);
app.use('/login', login)
app.use('/rejestracja', rejestracja)
app.use('/rejestracja/nowe', v_rejestracja)

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app, app_sprzed;
