var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" })
    }

    return res.render('admin/index');

})
app.get('/motywy', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" })
    }
    return res.render('admin/motywy');

})

app.get('/oferta', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" })
    }
    return res.render('admin/oferta');

})

module.exports = app;