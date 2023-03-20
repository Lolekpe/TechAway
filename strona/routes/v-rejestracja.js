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
            con.query(`SELECT email FROM uzytkownicy WHERE email = '${req.body.mail}'`, (err, row) => {
                if (err) return console.log(err);
                if (row.length === 0) return con.query(`INSERT INTO uzytkownicy (ID, imie, nazwisko, telefon, email, haslo, sprzedawca) VALUES ('','${req.body.name}','${req.body.naz}','','${req.body.mail}','${req.body.haslo}','0')`, (err) => {
                    if (err) return res.send(err)

                    res.cookie("logged", "true", { maxAge: 1920000 });
                    res.redirect("/");
                });

                return res.redirect("/rejestracja?failed=true")
            });
        });
        con.destroy();
    });

module.exports = app;