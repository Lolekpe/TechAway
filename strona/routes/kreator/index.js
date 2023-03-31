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
let x;

app.route('/')
    .get((req, res, next) => {
        if (req.query.final) {
            var table = sql.createConnection({
                host: 'localhost',
                user: 'root',
                password: "",
                database: `sklep_${database.nazwa}`
            });
            table.connect((err) => {
                if (err) return res.send(err)
                table.query(`CREATE TABLE informacje (id INT AUTO_INCREMENT PRIMARY KEY, nazwa VARCHAR(255), motyw INT, wyglad INT, opis VARCHAR(255), telefon INT)`, (err, row) => {
                    if (err) return res.send(err);
                    table.query(`INSERT INTO informacje (ID, nazwa, motyw, wyglad, opis, telefon) VALUES (NULL, '${database.nazwa.toString()}', ${database.motyw}, ${database.uklad}, '${database.opis}', ${database.numer})`, (err, row) => {
                        if (err) return res.send(err);
                        table.query(`CREATE TABLE produkty (id INT AUTO_INCREMENT PRIMARY KEY, nazwa VARCHAR(255), opis VARCHAR(255), cena DECIMAL(2,0), przecena INT)`, (err) => {
                            if(err) return console.log(err);
                            return res.redirect("/")
                        })
                    });
                });
            })

        }
        if (req.query.settings && database.nazwa) {
            con.connect(() => {
                con.query(`UPDATE uzytkownicy SET telefon = ${database.numer} WHERE ID = ${req.cookies.user}`, (err, row) => {
                    if (err) return res.send(err);
                    con.query(`INSERT INTO sklepy(ID, nazwa, typ, motyw, uklad, opis, logo, link) VALUES (NULL, '${x}', 0, ${database.motyw}, ${database.uklad}, '${database.opis}', '/images/serwery/${database.nazwa}/logo.png', '/${database.nazwa}/index')`, (err, row) => {
                        if (err) return res.send(err);
                        return res.redirect("/kreator?final=true&krok=7");
                    });
                })
            })
        }
        if (((!req.query.krok) || (!database.nazwa)) && (!req.query.error)) {
            return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: 1, informacja: "" })
        }
        if (req.query.error) {
            return res.render('kreator/index.ejs', { stage: "TechAway | Kreator strony", wyglad: 1, informacja: '<div>Taka nazwa została już użyta!</div>' })
        }
        switch (req.query.krok) {
            case '2':
                console.log(con.state)
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
                        if (row.length !== 0) return res.redirect('/kreator?krok=1&error=true');
                        x = req.body.nazwa
                        if (database.nazwa) {
                            database.nazwa = req.body.nazwa;
                            database.nazwa = x.toLowerCase().replaceAll(" ", "_");
                            return res.redirect('/kreator?krok=2');
                        }
                        database.nazwa = req.body.nazwa;
                        database.nazwa = x.toLowerCase().replaceAll(" ", "_");
                        return res.redirect('/kreator?krok=2');
                    });
                });

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
                    newDb.query(`CREATE DATABASE sklep_${database.nazwa.toString()}`, (err, row) => {
                        if (err) return res.send(err);
                        return res.redirect("/kreator?settings=true&krok=6")
                    });

                });
                break;
        }
    });

module.exports = app;