var express = require('express');
var router = express.Router();
var sql = require("mysql")
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})
var rodzaj;
/* GET home page. */
router.get('/', function (req, res) {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Strona Główna" });

    }
    con.connect(function () {
        let back = "";
        con.query(`SELECT * FROM sklepy`, (err, row) => {
            if (err) return res.send(err);
            let nazwa = row.map((item) => item.nazwa);
            let typ = row.map((item) => item.typ).toString();
            let opis = row.map((item) => item.opis);
            let logo = row.map((item) => item.logo);
            let link = row.map((item) => item.link);


            for (let i = 0; i < row.length; i++) {
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
                    `<span class="przejdzdosklepu"><a href="${link[i]}">Przejedź do sklepu</a></span>`+
                    `</div>`;
            }
            let nowy = `<div class="dodwaniesklepu"><div class="dodajsklep"><i class="fa-solid fa-plus"></i></div></div>`
            res.render('index', { stage: "TechAway | Strona Główna", sklepy: back, nowy: nowy });
        })
    })



});

module.exports = router;
