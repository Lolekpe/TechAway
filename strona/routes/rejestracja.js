var express = require('express');
var app = express();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})

var resul = 0;
/* GET home page. */
app.route('/')
    .post(function (req, res) {
        var crypto = require("crypto");
        var sha256 = crypto.createHash("sha256");
        sha256.update(req.body.haslo, "utf");
        resul = sha256.digest("base64");

        con.connect(function () {
            con.query(`SELECT email FROM uzytkownicy WHERE email = '${req.body.mail}'`, (err, row) => {
                if (err) return console.log(err);
                if (row.length === 0) return con.query(`INSERT INTO uzytkownicy (ID, imie, nazwisko, telefon, email, haslo, sprzedawca) VALUES ('','${req.body.name}','${req.body.naz}','','${req.body.mail}','${resul}','0')`, (err) => {
                    if (err) return res.send(err)

                    res.redirect("/login?register=pass");
                });
                return res.redirect("/rejestracja?failed=true");
            });
        });
    })
    .get((req, res, next) => {
        if (req.query.failed) {
            console.log("xd")
            return res.render('rejestracja', { message: `<div class="jedendwatrzy">Informacje które podałeś są już w bazie danych!</div>`, stage: "TechAway | Rejestracja" });
        }
        res.render("rejestracja", { message: "", stage: "TechAway | Rejestracja" });
    });

module.exports = app;