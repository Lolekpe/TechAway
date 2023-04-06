var express = require("express");
var app = express();
var sql = require("mysql")


app.route('/')
    .get((req, res, next) => {
        let sklep = req.baseUrl.split('/');
        let exists = false;
        var con = sql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: `techaway`,
        });
        con.getConnection((err, connection) => {
            con.query(`SELECT * FROM sklepy`, (err, row) => {
                for (let i = 0; i < row.length; i++) {
                    let nazwa = row.map((item) => item.nazwa);
                    if (nazwa[i].toLowerCase().replace(" ", "_") !== sklep[1]) {
                        continue;
                    }
                    exists = true;
                }
                if (!exists) {
                    connection.release();
                    return res.send("<h1>Podany link jest nie właściwy!</h1><br><p>Dzieje sie tak, kiedy przepisując link wybierzesz zły znak, albo właściciel strony wyłączył ją z użytku!</p><br><button onclick='history.back()'>Wróć do wcześniejszej strony</button>")
                }
                if (sklep[2] == "index" && exists) {
                    var informacje = {}
                    var sklep_db = sql.createPool({
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: `sklep_${sklep[1]}`,
                    });
                    sklep_db.getConnection((err, connection) => {
                        connection.query(`SELECT * FROM informacje`, (err, row) => {
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
                            connection.release();
                            return res.render("sklepy/index", { stage: `${informacje.nazwa} | Główna`, informacje: informacje })
                        });
                    });
                }
                if (sklep[2] == "koszyk" && exists) {
                    let sklep = req.baseUrl.split('/');
                    var informacje = {};
                    var db = sql.createPool({
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: `techaway`,
                    });
                    db.getConnection((err, connection) => {
                        connection.query(`SELECT * FROM sklepy WHERE nazwa LIKE '${sklep[1]}'`, (err, row) => {
                            let img = row.map((item) => item.logo);
                            connection.release();
                            return res.render("sklepy/koszyk", { image: img })
                        });
                    })
                }

            });
        });
    }).post((req, res) => {

    });

module.exports = app;