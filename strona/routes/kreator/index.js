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
var newDb = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
})

app.route('/')
    .get((req, res, next) => {
        if ((!req.query.krok) || (!database.nazwa)) {
            console.log("XD?")
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
                return res.render("kreator/index.ejs", { stage: "TechAway | Kreator strony", wyglad: 5 })
        }

    }).post((req, res) => {
        switch (req.query.krok) {
            case '1':
                con.connect(function () {
                    con.query(`SELECT * FROM sklepy WHERE nazwa LIKE "${req.body.nazwa}"`, (err, row) => {
                        if (err) return res.send(err);
                        if (row.length !== 0) return res.send("No niestety");
                        let x = req.body.nazwa
                        if (database.nazwa) {
                            database.nazwa = req.body.nazwa;
                            database.nazwa = x.toLowerCase().replaceAll(" ", "-");
                            return res.redirect('/kreator?krok=2');
                        }
                        database.nazwa = req.body.nazwa;
                        database.nazwa = x.toLowerCase().replaceAll(" ", "-");
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
                database.numer = req.body.phone;
                console.log(database);

                newDb.connect(() => {
                    newDb.query(`CREATE DATABASE ${database.nazwa}`, (err, row) => {
                        if(err) return res.send(err);
                        var table = sql.createConnection({
                            host: 'localhost',
                            user: 'root',
                            password: "",
                            database: `${database.nazwa}`
                        });
                        table.connect((err) => {
                            if(err) return res.send(err)
                            table.query(`CREATE TABLE ustawienia (ID INT AUTO_INCREMENT PRIMARY KEY, nazwa TEXT, motyw INT, wyglad INT, opis TEXT, telefon INT`, (err, row)=>{
                                if(err) return res.send(err)
                                table.query(`INSERT INTO ustawienia(ID, nazwa, motyw, wyglad, opis, telefon) VALUES (NULL, ${database.nazwa}, ${database.motyw}, ${database.uklad}, ${database.opis}, ${database.numer})`, (err, row) =>{
                                    if(err) return res.send(err);
                                })
                            })
                        })
                    });
                    con.query(`UPDATE uzytkownicy SET telefon = ${database.numer} WHERE ID = ${req.cookies.user}`, (err, row) => {
                        if(err) return res.send(err);
                    })
                })
                return res.send("No to essa");
        }
    });

module.exports = app;