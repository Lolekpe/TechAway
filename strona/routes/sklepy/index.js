var express = require("express");
var app = express();
var sql = require("mysql")

app.route('/')
    .get((req, res, next) => {
        let sklep = req.baseUrl.split('/');
        if (sklep[2] == "index") {
            var informacje = {}
            var sklep_db = sql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: `sklep_${sklep[1]}`,
            });
            sklep_db.connect((err) => {
                if (err) return console.log(err);

                sklep_db.query(`SELECT * FROM informacje`, (err, row) => {
                    console.log(row);
                    informacje.nazwa = row.map((item) => item.nazwa)
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
                    informacje.telefon = format
                    return res.render("sklepy/index", { stage: `${informacje.nazwa} | Główna`, informacje: informacje })
                });
            });
        }
        if (sklep[2] == "koszyk") {
            let sklep = req.baseUrl.split('/');
            var informacje = {}
            var db = sql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: `techaway`,
            });
            db.connect((err) => {
                db.query(`SELECT * FROM sklepy WHERE nazwa LIKE '${sklep[1]}'`, (err, row) => {
                    if (err) return res.send(err);

                    return res.render("sklepy/koszyk", { image: row.map((item) => item.logo) });
                })
            })

        }

    })
    .post((req, res) => {

    });

module.exports = app;