var express = require('express');
var app = express();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})
let resul;
let resul_1;

app.route("/")
    .get((req, res, next) => {
        let id = req.cookies.user;

        if (!req.cookies.logged) {
            return res.redirect('/');
        }
        switch (req.query.opcja) {
            case 'wyloguj':
                res.clearCookie("logged");
                res.clearCookie("user");
                return res.redirect("/login?akcja=wylogowanie");
            case 'usun':
                // coś jeszce przed tym będzie xddd
                con.connect(function () {
                    con.query(`DELETE FROM uzytkownicy WHERE ID = ${id}`);
                })
                res.clearCookie("logged");
                res.clearCookie("user");
                return res.redirect("/login?akcja=usun")
        }

        switch (req.query.zmiana) {
            case '1':
                if (req.query.blad) {
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 1, message: '<p>Nie możesz podać takiego samego imienia!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 1, message: "" });
            case '2':
                if (req.query.blad) {
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 2, message: '<p>Nie możesz podać takiego samego nazwiska!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 2, message: "" });
            case '3':
                if (req.query.blad) {
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 3, message: '<p>Nie możesz podać takiego samego maila!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 3, message: "" });
            case '4':
                if (req.query.blad == "stare") {
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 4, message: '<p>Nie poprawne stare hasło!</p>' });
                }
                if (req.query.blad == "nowe") {
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 4, message: '<p>Nowe hasło jest takie same jak stare!</p>' });
                }
                if (req.query.blad == "rozne") {
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 4, message: '<p>Nowe hasło i potwierdz jest różne!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 4, message: "" });

            default:
                con.connect(function () {
                    con.query(`SELECT * FROM uzytkownicy WHERE ID = ${id}`, (err, row) => {
                        let imie = row.map((item) => item.imie);
                        let nazwisko = row.map((item) => item.nazwisko);
                        let mail = row.map((item) => item.email);
                        let zw = row.map((item) => item.potwierdzony).toString();
                        let zweryfikowany = zw == 1 ?
                            `<span class="zmiana-wartosci-ustawienia guzikpotweirdzenia"><i class="fa-solid fa-check"></i></span>` :
                            `<span class="wartosc-ustawienia"><span class="emailniepotwierdzony"><a href="/ustawienia?potwierdz=send"><i class="fa-solid fa-x"></a></i></span></span>`;


                        let data = `                    
                        <p>
                            <span class="nazwa-ustawienia">Imię: </span>
                            <span class="wartosc-ustawienia">${imie}</span>
                            <span class="zmiana-wartosci-ustawienia"><a href="/ustawienia?zmiana=1"><i class="fa-solid fa-pen"></i></a></span>
                        </p>` +
                            `<p>
                            <span class="nazwa-ustawienia">Nazwisko: </span>
                            <span class="wartosc-ustawienia">${nazwisko}</span>
                             <span class="zmiana-wartosci-ustawienia"><a href="/ustawienia?zmiana=2"><i class="fa-solid fa-pen"></i></a></span>
                        </p>` +
                            `
                        <p>
                            <span class="nazwa-ustawienia">Mail: </span>
                            <span class="wartosc-ustawienia">${mail}</span>
                            <span class="zmiana-wartosci-ustawienia"><a href="/ustawienia?zmiana=3"><i class="fa-solid fa-pen"></i></a></span>
                        </p>` +
                            `
                        <p>
                            <span class="nazwa-ustawienia">Haslo: </span>
                            <span class="wartosc-ustawienia">*******</span>
                            <span class="zmiana-wartosci-ustawienia"><a href="/ustawienia?zmiana=4"><i class="fa-solid fa-pen"></i></a></span>
                        </p>` +
                            ` 
                        <p>
                            <span class="nazwa-ustawienia">Potwierdzenie mail'a </span>
                            ${zweryfikowany}
                        </p>`;

                        return res.render("ustawienia", { stage: "TechAway | Ustawienia", informacje: data, zmiana: false });
                    })
                });

        }
    })
    .post((req, res, next) => {
        switch (req.query.change) {
            case 'imie':
                con.query(`SELECT imie FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                    if (req.body.imie == row.map((item) => item.imie)) {
                        return res.redirect("/ustawienia?zmiana=1&blad=true");
                    }
                    con.query(`UPDATE uzytkownicy SET imie = "${req.body.imie}" WHERE ID = ${req.cookies.user}`);
                    return res.redirect("/ustawienia");
                });
            case 'nazwisko':
                con.query(`SELECT nazwisko FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                    if (req.body.nazwisko == row.map((item) => item.nazwisko)) {
                        return res.redirect("/ustawienia?zmiana=2&blad=true");
                    }
                    con.query(`UPDATE uzytkownicy SET nazwisko = "${req.body.nazwisko}" WHERE ID = ${req.cookies.user}`);
                    return res.redirect("/ustawienia");

                });
            case 'mail':
                con.query(`SELECT email FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                    let x = req.body.mail.split("@");
                    if (x[1] == ["admin.com" || "techaway.com"]) {
                        return res.redirect("/ustawienia");
                    }
                    if (req.body.mail == row.map((item) => item.mail)) {
                        return res.redirect("/ustawienia?zmiana=3&blad=true");
                    }
                    con.query(`UPDATE uzytkownicy SET email = "${req.body.mail}", potwierdzony = 0 WHERE ID = ${req.cookies.user}`);
                    return res.redirect("/ustawienia");
                });
            case 'haslo':
                if (req.body.nowe != req.body.potwierdz) {
                    return res.redirect("/ustawienia?blad=rozne")
                }
                con.query(`SELECT haslo FROM uzytkownicy WHERE = ${req.cookies.user}`, (err, row) => {
                    var crypto = require("crypto");
                    var sha256 = crypto.createHash("sha256");
                    var sha256_1 = crypto.createHash("sha256");
                    sha256.update(req.body.stare, "utf");
                    resul = sha256.digest("base64");
                    sha256_1.update(req.body.nowe, "utf");
                    resul_1 = sha256_1.digest("base64");

                    if (resul == row.map((item) => item.haslo)) {
                        return res.redirect("/ustawienia?blad=stare")
                    }
                    if (resul_1 == row.map((item) => item.haslo)) {
                        return res.redirect("/ustawienia?blad=nowe")
                    }
                    con.query(`UPDATE uzytkownicy SET haslo = ${resul_1} WHERE ID = ${req.cookies.user}`, (err) => {
                        return res.redirect("/ustawienia")
                    });
                })
        }
    })

module.exports = app;