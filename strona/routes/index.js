var express = require('express');
var router = express.Router();
var rodzaj;
var sql = require("mysql");
var con = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway',
    connectionLimit: 300,
})
/* GET home page. */
router.get('/', function (req, res) {
    if (!req.cookies.logged) {
        return res.redirect(`http://${x}/login?loginFirst=true`);
    }
    if (req.cookies.user) {
        con.getConnection((err, connection) => {
            if (err) return res.send(err);
            connection.query(`SELECT * FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                if (err) {
                    connection.release();
                    return res.send(err);
                }
                if (row.length === 0) {
                    connection.release();
                    return res.redirect('/login')
                }
            })
        })
    }
    con.getConnection((err, connection) => {
        let back = "";
        connection.query(`SELECT * FROM sklepy`, (err, row) => {
            if (err) return res.send(err);
            let nazwa = row.map((item) => item.nazwa);
            let typ = row.map((item) => item.typ).toString();
            let opis = row.map((item) => item.opis);
            let logo = row.map((item) => item.logo);
            let link = row.map((item) => item.link);
            let vis = row.map((item) => item.widocznosc);
            for (let i = 0; i < row.length; i++) {
                if (vis[i] === 0) {
                    continue;
                }
                switch (typ[i]) {
                    case '1':
                        rodzaj = "Elektronika";
                        break;
                    case '2':
                        rodzaj = "Księgarnia";
                        break;
                    case '3':
                        rodzaj = "Odzieżowy";
                        break;
                    case '4':
                        rodzaj = "Gastronomiczny";
                        break;
                }
                back += `<div class="shop"><span class="logo"> <img src="${logo[i]}" alt="" class="logo-shop"> </span>` +
                    `<span class="nazwa"> ${nazwa[i]} </span>` +
                    `<span class="opis"> ${opis[i]} </span>` +
                    `<span class="przejdzdosklepu"><a href="${link[i]}">Przejedź do sklepu</a></span>` +
                    `</div>`;
            }
            let nowy = `<div class="dodwaniesklepu"><a href="/kreator"><div class="dodajsklep"><i class="fa-solid fa-plus"></i></div></a></div>`;
            connection.release();
            let origin = req.cookies.origin === "server" ? "51.83.250.85:8000" : "127.0.0.1:8000";

            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            return res.render('index', { stage: "TechAway | Strona Główna", sklepy: back, nowy: nowy, admin: origin });
        })
    })



});

module.exports = router;
