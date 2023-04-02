var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var login = require("./routes/login")
var rejestracja = require("./routes/rejestracja");
var profil = require("./routes/profil");
var kreator = require("./routes/kreator/index");
var sklepy = require("./routes/sklepy/index");


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/profil', profil);
app.use('/index', routes);
app.use('/login/validate', login);
app.use('/login', login);
app.use('/rejestracja', rejestracja)
app.use('/rejestracja/nowe', rejestracja)
app.use('/kreator', kreator);
app.use('/:site/:view', sklepy);

/// catch 404 and forward to error handler
app.use((error, req, res, next) => {
    return res.send(error)
})

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


module.exports = app;
