var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sql = require("mysql");
let id;
var multer = require("multer");
var cdn = multer({ dest: `./public/cdn/temp` });
var fs = require("fs");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, type: "" }));
app.use(cdn.array("zdjecie"))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((error, req, res, next) => {
    return res.send(error);
})

app.get('/', (req, res, next) => {
    var informacje = {};
    if (!req.cookies.logged) {
        return res.redirect("http://51.83.250.85:3000")
    }
    if(req.query.brak) {
        return res.send("<body style='background-color:black; color: white'><p style='font-size: 32px'>Wynika na to że nie posiadasz żadnych sklepów...</p><br><p style='font-size:32px' onclick='history.go(-1)'>Wróć do wcześniejszej strony i utwórz sklep! Kliknij na mnie!</p>")
    }
    var con = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'techaway'
    })
    con.connect(() => {
        con.query(`SELECT * FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
            if (row.length === 0) {
                return res.redirect("http://51.83.250.85:8000/?brak=true")
            };
            id = row.map((item) => item.ID);
            let nazwa = row.map((item) => item.nazwa);
            let opis = row.map((item) => item.opis);
            let zdj = row.map((item) => item.logo);
            informacje.nazwa = nazwa;
            informacje.logo = zdj;
            informacje.opis = opis;
            fs.stat(`./public/cdn/${id}`, (err, res) => {
                if (err) return fs.mkdir(`./public/cdn/${id}`, (err) => {
                    if (err) return console.log(err);
                });
            })
            return res.render('admin/index', { informacje: informacje });
        })
    })

});
app.post('/', (req, res, next) => {
    if (req.query.logo) {
        var tmp_path;
        let sklep;
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        con.connect(() => {
            con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user} `, (err, row) => {
                if (err) return res.send(err);
                sklep = row.map((item) => item.nazwa);
                tmp_path = req.file.path;
                prod_id = row.map((item) => item.id).toString();
                var cor_path = `./public/images/serwery/${sklep.toString().toLowerCase().replace(" ", "_")}/logo.png`;
                if (fs.existsSync(cor_path)) {
                    fs.rmSync(cor_path);
                }
                var tmp = fs.createReadStream(tmp_path);
                var dest = fs.createWriteStream(cor_path, { flags: "a" });

                tmp.pipe(dest);
                tmp.on('end', () => {
                    fs.rmSync(req.file.path);
                    return res.redirect("/");
                })
                tmp.on('error', (err) => {
                    console.log(err)
                });

            });
        });

    }
    if (req.query.opis) {
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        con.connect(() => {
            con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                if (err) return res.send(err);
                let x = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                var sklep_db = sql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: "",
                    database: `sklep_${x}`
                })
                sklep_db.connect(() => {
                    sklep_db.query(`UPDATE informacje SET opis = '${req.body.dobre}' WHERE id = 1`, () => {
                        con.query(`UPDATE sklepy SET opis = '${req.body.dobre}' WHERE wlasciciel = ${req.cookies.user}`, () => {
                            return res.redirect('/')
                        })
                    })
                });
            });
        });
    };
});
app.get('/motywy', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" });
    }

    if (req.query.opcja) {
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        con.connect((err) => {
            if (err) return res.send(err);
            con.query(`UPDATE sklepy SET motyw = ${req.query.opcja} WHERE wlasciciel = ${req.cookies.user}`, () => {
                con.query(`SELECT nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                    let nazwa = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                    var sklep_db = sql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: "",
                        database: `sklep_${nazwa}`
                    })
                    sklep_db.connect((err) => {
                        if (err) return res.send(err)
                        sklep_db.query(`UPDATE informacje SET motyw = ${req.query.opcja} WHERE wlasciciel = ${req.cookies.user}`, (err) => {
                            if (err) return res.send(err)
                            return res.render("admin/motywy", { message: "<div style='position: absolute; top:100px'>Pomyślnie zmieniono motyw!</div>" });
                        })
                    })
                })
            });
        });
    } else {
        return res.render('admin/motywy', { message: "" });
    }

});
app.get('/oferta', (req, res, next) => {
    if (!req.cookies.logged) {
        return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Logowanie" })
    }
    switch (req.query.opcja) {
        case '1':
            return res.render('admin/oferta', { wyswietl: 2 });
        case '2':
            let edcom = "";
            var con = sql.createConnection({
                host: 'localhost',
                user: 'root',
                password: "",
                database: 'techaway'
            })
            con.connect(() => {
                con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                    if (err) return res.send(err);
                    let x = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                    var sklep_db = sql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: "",
                        database: `sklep_${x}`
                    })
                    sklep_db.connect(() => {
                        sklep_db.query(`SELECT * FROM produkty`, (err, row) => {
                            let nazwa = row.map((item) => item.nazwa)
                            let id = row.map((item) => item.id)
                            let cena = row.map((item) => item.cena)
                            let ikona = row.map((item) => item.ikona)
                            for (let i = 0; i < row.length; i++) {
                                edcom += `<form action="/oferta?usun=${id[i]}" method="post"><div class="oferta"><div class="image-container2"><img src="${ikona[i]}" alt="" class="obrazek-ofert"></div>` +
                                    `<div class="szybki-opis"><span>Produkt: ${nazwa[i]}</span><br><span>Cena: ${cena[i]}</span></div><div class="tu-jest-guzior">` +
                                    `<button class="usuwanie-oferty">usuń</button></div></div></form>`;
                            }
                            return res.render('admin/oferta', { wyswietl: 3, produkt: edcom });
                        })
                    });
                });
            });
            break;

        default:
            let combo = "";
            var con = sql.createConnection({
                host: 'localhost',
                user: 'root',
                password: "",
                database: 'techaway'
            })
            con.connect(() => {
                con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                    if (err) return res.send(err);
                    let x = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                    var sklep_db = sql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: "",
                        database: `sklep_${x}`
                    })
                    sklep_db.connect(() => {
                        sklep_db.query(`SELECT * FROM produkty`, (err, row) => {
                            let nazwa = row.map((item) => item.nazwa)
                            let id = row.map((item) => item.id)
                            let cena = row.map((item) => item.cena)
                            let ikona = row.map((item) => item.ikona)
                            for (let i = 0; i < row.length; i++) {
                                combo += `<div class="oferta"><form action="/oferta?zmiana=${id[i]}" enctype="multipart/form-data" method="post"><div class="image-container">` +
                                    `<input name="zdjecie" value="" id="file-input-${id[i]}" type="file" class="inpucik" accept=".jpg, .png, .jpeg, .webp"><label for="file-input">` +
                                    `<img src="${ikona[i]}" alt="" class="obrazek-ofert"></label></div><div class="szybki-opis"><span>Produkt:` +
                                    `<input name="produkt" type="text" value="${nazwa[i]}" class="opis-do-zmian" maxlength="45">Cena: ` +
                                    `<input name="cena" type="text" value="${cena[i]}" class="opis-do-zmian" maxlength="9"></span></div>` +
                                    `<div class="tu-jest-guzior"><button class="akceptacja-zmian">Akceptuj</button></div></form></div>`;
                            }
                            return res.render('admin/oferta', { wyswietl: 1, produkt: combo })
                        })
                    })
                });
            });
            break;
    };
});
app.post('/oferta', (req, res, next) => {
    if (req.query.utworz) {
        let sklep_id;
        let prod_id;
        var tmp_path;
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        con.connect(() => {
            con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user} `, (err, row) => {
                if (err) return res.send(err);
                let x = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                sklep_id = row.map((item) => item.ID);
                tmp_path = req.file.path;
                var sklep_db = sql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: "",
                    database: `sklep_${x}`
                })
                sklep_db.connect((err) => {
                    if (err) return res.send("1 " + err)
                    sklep_db.query(`INSERT INTO produkty (id, nazwa, opis, ikona, cena, przecena) VALUES (NULL, '${req.body.produkt}', NULL, NULL, ${req.body.cena.toString()}, NULL)`, (err) => {
                        if (err) return res.send("2 " + err);
                        sklep_db.query(`SELECT id FROM produkty WHERE nazwa = '${req.body.produkt}'`, (err, row) => {
                            prod_id = row.map((item) => item.id).toString();
                            var cor_path = `./public/cdn/${sklep_id}/${prod_id}.png`;
                            fs.stat(cor_path, (err) => {
                                if (err) return fs.mkdirSync(`./public/cdn/${sklep_id}`, { recursive: true });
                            });
                            var tmp = fs.createReadStream(tmp_path);
                            var dest = fs.createWriteStream(cor_path, { flags: "a" });

                            tmp.pipe(dest);
                            tmp.on('end', () => {
                                fs.rmSync(req.file.path);
                                sklep_db.query(`UPDATE produkty SET ikona = '/cdn/${sklep_id}/${prod_id}.png' WHERE id = ${prod_id}`, (err) => {
                                    console.log(err);
                                })
                                return res.redirect("/oferta?opcja=3");
                            })
                            tmp.on('error', (err) => {
                                console.log(err)
                            });
                        });
                    });
                });
            });
        });
    };
    if (req.query.usun) {
        let id = req.query.usun;
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        con.connect(() => {
            con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                if (err) return res.send(err);
                let x = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                var sklep_db = sql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: "",
                    database: `sklep_${x}`
                });
                sklep_db.connect(() => {
                    sklep_db.query(`DELETE FROM produkty WHERE id = ${id}`);
                    return res.redirect("/oferta?opcja=3")
                })
            });
        });
    };
    if (req.query.zmiana) {
        let id = req.query.zmiana;
        let s_id;
        var con = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        })
        console.dir(req.file)
        console.dir(req.files)
        if (req.file) { tmp_path = req.file.path };
        con.connect(() => {
            con.query(`SELECT ID, nazwa FROM sklepy WHERE wlasciciel = ${req.cookies.user}`, (err, row) => {
                if (err) return res.send(err);
                let x = row.map((item) => item.nazwa).toString().toLowerCase().replace(" ", "_");
                s_id = row.map((item) => item.ID)
                var sklep_db = sql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: "",
                    database: `sklep_${x}`
                })
                sklep_db.connect(() => {
                    sklep_db.query(`UPDATE produkty SET nazwa = '${req.body.produkt}', cena = ${req.body.cena.toString()} WHERE id = ${id}`, () => {
                        if (req.file) {
                            var cor_path = `./public/cdn/${s_id}/${id}.png`;
                            fs.rmSync(cor_path);
                            var tmp = fs.createReadStream(tmp_path);
                            var dest = fs.createWriteStream(cor_path, { flags: "a" });

                            tmp.pipe(dest);
                            tmp.on('end', () => {
                                fs.rmSync(req.file.path);
                                return res.redirect("/oferta?opcja=3");
                            })
                            tmp.on('error', (err) => {
                                console.log(err)
                            });
                        } else {
                            return res.redirect("/oferta?zmiana=3")
                        }
                    })
                })
            });
        });
    };
});

module.exports = app;