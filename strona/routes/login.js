var express = require('express');
var app = express();
var sql = require("mysql");
let resul = 0;
var con = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway',
    connectionLimit: 300,
});

/* GET home page. */
app.route('/')
    .post(function (req, res) {
        var crypto = require("crypto");
        var sha256 = crypto.createHash("sha256");
        sha256.update(req.body.haslo, "utf")
        resul = sha256.digest("base64");
        con.getConnection((err, connection) => {
            connection.query(`SELECT * FROM uzytkownicy WHERE email = '${req.body.mail}' AND haslo = '${resul}'`, (err, row) => {
                if (err) return console.log(err);
                if (row.length === 0) return res.redirect("/login?failedLogin=true");
                let x = row.map((item) => item.ID).toString();
                let y = req.headers.host === '51.83.250.85:3000' ? "server" : "localhost";
                connection.release();
                res.cookie("logged", "true", { maxAge: 192000000 });
                res.cookie("user", x, { maxAge: 192000000 });
                res.cookie("origin", y, { maxAge: 192000000 })
                return res.redirect("/");
            });
        });
    })
    .get((req, res, next) => {
        if (req.query.failedLogin) {
            return res.render('login', { message: `<div class="jedendwatrzy">Zle dane logowania!</div>`, stage: "TechAway | Logowanie" });
        }
        if (req.query.register) {
            return res.render('login', { message: `<div class="jedendwatrzy">Pomyślnie zarejestrowano, zaloguj się!</div>`, stage: "TechAway | Logowanie" });
        }
        switch (req.query.akcja) {
            case 'wylogowanie':
                return res.render('login', { message: `<div class="jedendwatrzy">Zostałeś/aś pomyślnie wylogowany/a</div>`, stage: "TechAway | Logowanie" });

            case 'usun':
                return res.render('login', { message: `<div class="jedendwatrzy">Twoje konto zostało usunięte</div>`, stage: "TechAway | Logowanie" });
        };
        res.render("login", { message: "", stage: "TechAway | Logowanie" });
    });

module.exports = app;