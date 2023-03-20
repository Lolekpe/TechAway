var express = require('express');
var app = express();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})

/* GET home page. */
app.route('/')
    .post(function (req, res) {
        con.connect(function () {
            con.query(`SELECT * FROM uzytkownicy WHERE email = '${req.body.mail}' AND haslo = '${req.body.haslo}'`, (err, row) => {
                if (err) return console.log(err);
                if (row.length === 0) return res.redirect("/login?failedLogin=true");
                var x = [
                    row.map((item) => item.email),
                    row.map((item) => item.haslo),
                    row.map((item) => item.imie),
                    row.map((item) => item.nazwisko),
                    row.map((item) => item.sprzedawca)
                ]
                app.locals.mail = x[0];
                app.locals.imie = x[2];
                app.locals.nazwisko = x[3];
                app.locals.sprzedawca = x[4];
                console.log(row)

                res.cookie("logged", "true", { maxAge: 1920000 })
                res.redirect("/");
            });
        });

    });

module.exports = app;