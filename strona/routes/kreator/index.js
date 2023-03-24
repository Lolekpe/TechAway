var express = require('express');
var app = express();
var sql = require("mysql");
var database = {};
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
});


app.route('/')
    .get((req, res, next) => {
        if (!req.query.krok) {
            return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: 1 })
        }
        switch (req.query.krok) {
            case '2':
                return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: 2 })
                
            case '3':
                if (database.motyw) {
                    database.motyw = req.query.opcja;
                    return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: 3 });
                }
                database.motyw = req.query.opcja;

                return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: 3 });
            case '4':
                if (database.uklad) {
                    database.uklad = req.query.opcja;
                    return res.render("kreator/index.ejs", { stage: "TechAway | Kreator strony", wyglad: 4 });

                }
                database.uklad = req.query.opcja;
                return res.render("kreator/index.ejs", { stage: "TechAway | Kreator strony", wyglad: 4 });
            case '5':
                console.log(database);
                return res.render("kreator/index.ejs", { stage: "TechAway | Kreator strony", wyglad: 5 })
        }

    }).post((req, res) => {
        switch (req.query.krok) {
            case '1':
                con.connect(function () {
                    con.query(`SELECT * FROM sklepy WHERE nazwa LIKE "${req.body.nazwa}"`, (err, row) => {
                        if (err) return res.send(err);
                        if (row.length !== 0) return res.send("No niestety");
                        if (database.nazwa) {
                            database.nazwa = req.body.nazwa;
                            return res.redirect('/kreator?krok=2');
                        }
                        database.nazwa = req.body.nazwa;
                        return res.redirect('/kreator?krok=2');
                    })
                })
                break;
            case '4':
                if (database.opis) {
                    database.opis = req.body.opis;
                    return res.redirect('/kreator?krok=5');
                }
                database.opis = req.body.opis;
                return res.redirect('/kreator?krok=5');
            case '5':


        }
    });

module.exports = app;