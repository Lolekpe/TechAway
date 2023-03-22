var express = require('express');
var router = express.Router();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})

router.get("/", (req, res, next) => {
    let id = req.cookies.user;

    if (!req.cookies.logged) {
        return res.redirect('/');
    }
    switch (req.query.opcja) {
        case 'wyloguj':
            res.clearCookie("logged");
            res.clearCookie("user");
            res.redirect("/login?akcja=wylogowanie");
            break;
        case 'usun':
            // coś jeszce przed tym będzie xddd
            con.connect(function () {
                con.query(`DELETE FROM uzytkownicy WHERE ID = ${id}`);
            })
            res.clearCookie("logged");
            res.clearCookie("user");
            res.redirect("/login?akcja=usun")
            break;
    }

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
                    <span class="zmiana-wartosci-ustawienia"><i class="fa-solid fa-pen"></i></span>
                </p>` +
                `<p>
                    <span class="nazwa-ustawienia">Nazwisko: </span>
                    <span class="wartosc-ustawienia">${nazwisko}</span>
                     <span class="zmiana-wartosci-ustawienia"><i class="fa-solid fa-pen"></i></span>
                </p>` +
                `
                <p>
                    <span class="nazwa-ustawienia">Mail: </span>
                    <span class="wartosc-ustawienia">${mail}</span>
                    <span class="zmiana-wartosci-ustawienia"><i class="fa-solid fa-pen"></i></span>
                </p>` + ` 
                <p>
                    <span class="nazwa-ustawienia">Potwierdzenie mail'a </span>
                    ${zweryfikowany}
                </p>`;

            res.render("ustawienia", { stage: "TechAway | Ustawienia", informacje: data });
        })
    })

})

module.exports = router;