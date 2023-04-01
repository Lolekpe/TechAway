var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sql = require("mysql");
var multer = require("multer");

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
    var informacje = {};
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" });
    }
    var con = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'techaway'
    })
    con.connect(() => {
        con.query(`SELECT * FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
            let nazwa = row.map((item) => item.nazwa);
            let opis = row.map((item) => item.opis);
            let zdj = row.map((item) => item.logo);
            informacje.nazwa = nazwa;
            informacje.logo = zdj;
            informacje.opis = opis;
            return res.render('admin/index', { informacje: informacje });
        })
    })

});
app.get('/motywy', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" });
    }

    if (req.query.opcja) {
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        con.connect((err) => {
            if (err) return res.send(err);
            con.query(`UPDATE sklepy SET motyw = ${req.query.opcja} WHERE wlasciciel = ${req.cookies.user}`, () => {
                con.query(`SELECT nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                    let nazwa = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                    console.log(nazwa)
                    var sklep_db = sql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: "",
                        database: `sklep_${nazwa}`
                    })
                    sklep_db.connect((err) => {
                        if (err) return res.send(err)
                        sklep_db.query(`UPDATE informacje SET motyw = ${req.query.opcja} WHERE wlasciciel = ${req.cookies.user}`, (err) => {
                            if (err) return res.send(err)
                            return res.render("admin/motywy", { message: "<div style='position: absolute; top:100px'>Pomyślnie zmieniono motyw!</div>" });
                        })
                    })
                })
            });
        });
    } else {
        return res.render('admin/motywy', { message: "" });
    }

});

app.get('/oferta', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" })
    }
    switch (req.query.opcja) {
        case 'dodawanie':
            return res.render('admin/oferta', { wyswietl: 2 });

        default:
            return res.render('admin/oferta', {wyswietl: 1})
    };
});
app.post('/oferta', (req, res, next) => {
    
})

module.exports = app;