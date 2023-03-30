var express = require('express');
var app = express();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})

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
                if(req.query.blad){
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 1, message: '<p>Nie możesz podać takiego samego imienia!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 1, message: "" });
            case '2':
                if(req.query.blad){
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 2, message: '<p>Nie możesz podać takiego samego nazwiska!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 2, message: "" });
            case '3':
                if(req.query.blad){
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 3, message: '<p>Nie możesz podać takiego samego maila!</p>' });
                }
                return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 3, message: "" });
            case '4':
                if(req.query.blad == "stare"){
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 4, message: '<p>Nie poprawne stare hasło!</p>' });
                }
                if(req.query.blad == "nowe"){
                    return res.render("ustawienia", { stage: "TechAway | Ustawienia", zmiana: 4, message: '<p>Nowe hasło jest takie same jak stare!</p>' });
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
                            `<span class="wartosc-ustawienia"><span class="emailniepotwierdzony"><i class="fa-solid fa-x"></i></span></span>`;


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
                        </p>` + ` 
                        <p>
                            <span class="nazwa-ustawienia">Potwierdzenie mail'a </span>
                            ${zweryfikowany}
                        </p>`;

                        return res.render("ustawienia", { stage: "TechAway | Ustawienia", informacje: data, zmiana: false });
                    })
                })

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

                })
        }
    })

module.exports = app;