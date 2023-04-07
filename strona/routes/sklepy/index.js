var express = require("express");
var app = express();
var sql = require("mysql")
var con = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: `techaway`,
    connectionLimit: 300,
});


app.route('/')
    .get((req, res, next) => {
        let sklep = req.baseUrl.split('/');
        let exists = false;
        con.getConnection((err, connection) => {
            if (err) return res.send(err);

            con.query(`SELECT * FROM sklepy`, (err, row) => {
                for (let i = 0; i < row.length; i++) {
                    let nazwa = row.map((item) => item.nazwa);
                    if (nazwa[i].toLowerCase().replace(" ", "_") !== sklep[2]) {
                        continue;
                    }
                    exists = true;
                }
                if (!exists) {
                    connection.release();
                    return res.send("<h1>Podany link jest nie właściwy!</h1><br><p>Dzieje sie tak, kiedy przepisując link wybierzesz zły znak, albo właściciel strony wyłączył ją z użytku!</p><br><button onclick='history.back()'>Wróć do wcześniejszej strony</button>")
                }
                if (sklep[3] == "index" && exists) {
                    var informacje = {};
                    var sklep_db = sql.createPool({
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: `sklep_${sklep[2]}`,
                        connectionLimit: 300,
                    });
                    sklep_db.getConnection((err, connection) => {
                        if (err) {
                            return res.status(500).send('Internal Server Error');
                        }
                        connection.query(`SELECT * FROM informacje`, (err, row) => {
                            if (err) {
                                connection.release();
                                return res.status(500).send('Internal Server Error');
                            }
                            informacje.nazwa = row.map((item) => item.nazwa);
                            let m = row.map((item) => item.motyw).toString();
                            switch (m) {
                                case '1':
                                    informacje.motyw = "classic";
                                    break;
                                case '2':
                                    informacje.motyw = "vintage";
                                    break;
                                case '3':
                                    informacje.motyw = "pastele";
                                    break;
                                case '4':
                                    informacje.motyw = "las";
                                    break;
                            };
                            informacje.opis = row.map((item) => item.opis);
                            let telefon = row.map((item) => item.telefon).toString();
                            let format = [telefon.slice(0, 3), telefon.slice(3, 6), telefon.slice(6)].join(" ");
                            informacje.telefon = format;
                            connection.query(`SELECT * FROM produkty`, (err, row) => {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send('Internal Server Error');
                                }
                                let stos;
                                if (row.length === 0) {
                                    stos = "";
                                } else {
                                    stos = row;
                                }
                                connection.release();
                                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                                res.setHeader('Pragma', 'no-cache');
                                res.setHeader('Expires', '0');
                                return res.render("sklepy/index", { stage: `${informacje.nazwa} | Główna`, informacje: informacje, produkt: stos });
                            });
                        });
                    });
                }
                if (sklep[3] == "koszyk" && exists) {
                    let zakupy = {};
                    let sklep = req.baseUrl.split('/');
                    var db = sql.createPool({
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: `techaway`,
                        connectionLimit: 300,
                    });
                    if (req.query.produkt && !req.cookies.koszyk) {
                        zakupy.id = req.query.produkt;
                        zakupy.nazwa = req.query.nazwa;
                        zakupy.cena = req.query.cena;
                        res.cookie("koszyk", zakupy, { maxAge: 1000 * 60 * 10 });
                    } else if (!req.cookies.koszyk) {
                        zakupy.id = 0;
                        zakupy.nazwa = "Pusty koszyk!";
                        zakupy.cena = "2137.99"; 
                    } else if (req.query.produkt) {
                        res.clearCookie("koszyk");
                        zakupy.id = req.query.produkt;
                        zakupy.nazwa = req.query.nazwa;
                        zakupy.cena = req.query.cena;
                        res.cookie("koszyk", zakupy, { maxAge: 1000 * 60 * 10 });
                    } else {
                        let x = req.cookies.koszyk;
                        zakupy.id = x.id;
                        zakupy.nazwa = x.nazwa;
                        zakupy.cena = x.cena;
                    }
                    db.getConnection((err, connection) => {
                        connection.query(`SELECT * FROM sklepy WHERE nazwa LIKE '${sklep[2]}'`, (err, row) => {
                            let img = row.map((item) => item.logo);
                            connection.release();
                            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                            res.setHeader('Pragma', 'no-cache');
                            res.setHeader('Expires', '0');
                            return res.render("sklepy/koszyk", { image: img, koszyk: zakupy })
                        });
                    })
                }

            });
        });
    }).post((req, res) => {

    });

module.exports = app;