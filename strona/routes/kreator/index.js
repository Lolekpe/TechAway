var express = require('express');
var app = express();
var sql = require("mysql");
var database = [];
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
});


app.route('/')
    .get((req, res, next) => {
        if(!req.query.krok) {
            var stage1 = `<div class="wybor-nazwy">` +
                `<div class="tekst-wyboru-nazwy"><p>Podaj nazwę sklepu</p></div>` +
                `<div class="tekst-rozszerzenie-nazwy"><p>Jak ma się nazywać twój sklep?</p></div>` +
                `<div class="formularz-wpisania-nazwy"><form action="/kreator?krok=1" method="post"><span class="ikona"><i class="fa-solid fa-signature"></i></span>` +
                `<input type="text" name="nazwa" required autocomplete="off"><p><button>Dalej <i class="fa-solid fa-arrow-right"></i></button></p></form></div>` +
                `<div class="anuluj"><span>Anuluj</span></div></div>`;
    
    
            return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: stage1 })
        }
        if(req.query.krok == 2 && req.query.opcja) {
            return res.send(req.query.opcja);
        }
        switch (req.query.krok) {
            case '2': 
                var stage2 = `<div class="wybur-motywu"><div class="left-motyw"><div class="napis-wybieranie-motywu">` +
                `<div class="napiski-container"><p class="napisjedenuwu">Wybierz motyw swojej strony</p>` + 
                `<p class="napisdwauwu">Wybierz w jakim motywie będzie robiona twoja strona, zadecyduj o jej wyglądzie końcowym.</p></div></div>` + 
                `</div><div class="right-motyw"><div class="motywy-container"><div class="motywy"><div class="motywy-left">` +
                `<a href="/kreator?krok=2&opcja=1"><div class="motyw-jest-uwu motywjeden motwy-podwujny">` + 
                `<div style="background-color: white; border-top-left-radius: 5px; border-top-right-radius: 5px;"></div>` + 
                `<div style="background-color: black; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"></div></div></a>` + 
                `<a href="/kreator?krok=2&opcja=2"><div class="motyw-jest-uwu motywdwa">` +
                `<div style="background-color: #CB997E; border-top-left-radius: 5px; border-top-right-radius: 5px;"></div>` + 
                `<div style="background-color: #A5A58D;"></div><div style="background-color: #F0EFEB; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"></div>` + 
                `</div></a></div><div class="motywyprawo"><a href="/kreator?krok=2&opcja=3"><div class="motyw-jest-uwu motywtrzy">` + 
                `<div style="background-color:  #FAD2E1; border-top-left-radius: 5px; border-top-right-radius: 5px;"></div>` + 
                `<div style="background-color: #BEE1E6;"></div><div style="background-color: #FFFFFC; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"></div>` + 
                `</div></a><a href="/kreator?krok=2&opcja=4"><div class="motyw-jest-uwu motywcztery">` + 
                `<div  style="background-color:  #4A2419; border-top-left-radius: 5px; border-top-right-radius: 5px;"></div>` + 
                `<div style="background-color: #343434;"></div><div style="background-color: #006466; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"></div>` + 
                `</div></a></div></div></div></div><div class="anuluj"><span>Anuluj</span></div></div>`;

                return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: stage2 })
            case '3': 
                return res.send("gitteeeem");
        }

    }).post((req, res) => {
        switch (req.query.krok) {
            case '1':
                con.connect(function () {
                    con.query(`SELECT * FROM sklepy WHERE nazwa LIKE "${req.body.nazwa}"`, (err, row) => {
                        if (err) return res.send(err);
                        if (row.length !== 0) return res.send("No niestety");
                        
                        database.push(req.body.nazwa);
                        return res.redirect('/kreator?krok=2');
                    })
                })
                break;
        }
    });

module.exports = app;