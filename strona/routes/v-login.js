var express = require('express');
var app = express();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})
var crypto = require("crypto");
var sha256 = crypto.createHash("sha256");
let resul = 0;

/* GET home page. */
app.route('/')
    .post(function (req, res) {
        sha256.update(req.body.haslo, "utf")
        resul = sha256.digest("base64");
        con.connect(function () {
            con.query(`SELECT * FROM uzytkownicy WHERE email = '${req.body.mail}' AND haslo = '${resul}'`, (err, row) => {
                if (err) return console.log(err);
                if (row.length === 0) return res.redirect("/login?failedLogin=true");
                let x = row.map((item) => item.ID).toString();
                

                res.cookie("logged", "true", { maxAge: 192000000 });
                res.cookie("user", x, {maxAge: 192000000});
                res.redirect("/");
            });
        });
    });
module.exports = app;