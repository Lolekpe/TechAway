var express = require('express');
var app = express();
var sql = require("mysql")
let resul;
let resul_1;
app.route('/')
    .get((req, res, next) => {
        if (req.query.wylogowanie) {
            res.clearCookie("user");
            res.clearCookie("logged");
            return res.redirect("/login?akcja=wylogowanie")
        }
        let wiadomosc = "";
        switch (req.query.error) {
            case 'imie':
                wiadomosc = `<div style="justify-content: center; display: flex; color: red">Nowe i stare imię jest takie same!</div>`
                break;
            case 'nazwisko':
                wiadomosc = `<div style="justify-content: center; display: flex; color: red">Nowe i stare nazwisko jest takie same!</div>`
                break;
            case 'mail':
                wiadomosc = `<div style="justify-content: center; display: flex; color: red">Nowy i stary email są takie same!</div>`
                break;
            case 'haslo':
                wiadomosc = `<div style="justify-content: center; display: flex; color: red">Nowe i stare hasło są takie same!</div>`
                break;
        }
        switch (req.query.udane) {
            case 'imie':
                wiadomosc = `<div style="justify-content: center; display: flex; color: green">Pomyślnie zmieniono imię!</div>`
                break;
            case 'nazwisko':
                wiadomosc = `<div style="justify-content: center; display: flex; color: green">Pomyślnie zmieniono nazwisko!</div>`
                break;
            case 'mail':
                wiadomosc = `<div style="justify-content: center; display: flex; color: green">Pomyślnie zmieniono email!</div>`
                break;
            case 'haslo':
                wiadomosc = `<div style="justify-content: center; display: flex; color: green">Pomyślnie zmieniono hasło!</div>`
                break;
        }
        let data = {};
        con.connect(() => {
            con.query(`SELECT * FROM uzytkownicy WHERE ID = ${req.cookies.user.toString()}`, (err, row) => {
                data.imie = row.map((item) => item.imie);
                data.nazwisko = row.map((item) => item.nazwisko);
                data.mail = row.map((item) => item.email);
                data.haslo = row.map((item) => item.haslo)
                let x = JSON.parse(row.map((item) => item.ustawienia));
                data.p_email = x.email ? "checked" : "";
                data.p_pop = x.popout ? "checked" : "";
                data.p_strona = x.strona ? "checked" : "";
                return res.render('profil', { informacje: data, message: wiadomosc });
            })
        })
    })
    .post((req, res, next) => {
        var con = sql.createPool({
            host: 'localhost',
            user: 'root',
            password: "",
            database: 'techaway'
        });
        switch (req.query.form) {
            case 'imie':
                if (req.body.imie == ["Techaway" || "Administrator" || "techaway" || "administrator"]) { return res.redirect("/profil"); }
                con.getConnection((err, connection) => {
                    connection.query(`SELECT imie FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                        if (err) {
                            connection.release();
                            return res.send(err)
                        }
                        if (req.body.imie == row.map((item) => item.imie)) {
                            connection.release();
                            return res.redirect("/profil?error=imie");
                        }
                        connection.query(`UPDATE uzytkownicy SET imie = '${req.body.imie}' WHERE ID = ${req.cookies.user}`, () => {
                            connection.release();
                            return res.redirect("/profil?udane=imie");
                        })

                    })
                })
                break;
            case 'nazwisko':
                if (req.body.nazwisko == ["Techaway" || "Administrator" || "techaway" || "administrator"]) { return res.redirect("/ustawienia"); }
                con.getConnection((err, connection) => {
                    connection.query(`SELECT nazwisko FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                        if (err) {
                            connection.release();
                            return res.send(err)
                        }
                        if (req.body.nazwisko == row.map((item) => item.nazwisko)) {
                            connection.release();
                            return res.redirect("/profil?error=nazwisko");
                        }
                        connection.query(`UPDATE uzytkownicy SET nazwisko = '${req.body.nazwisko}' WHERE ID = ${req.cookies.user}`, () => {
                            connection.release();
                            return res.redirect("/profil?udane=nazwisko");
                        })

                    })
                })
                break;
            case 'mail':
                let x = req.body.mail.split("@");
                if (x[1] == ["admin.com" || "techaway.com"]) { return res.redirect("/profil") }
                con.getConnection((err, connection) => {
                    connection.query(`SELECT email FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                        if (err) {
                            connection.release();
                            return res.send(err)
                        }
                        if (req.body.mail == row.map((item) => item.email)) {
                            connection.release();
                            return res.redirect("/profil?error=mail");
                        }
                        connection.query(`UPDATE uzytkownicy SET email = '${req.body.mail}' WHERE ID = ${req.cookies.user}`, () => {
                            connection.release();
                            return res.redirect("/profil?udane=mail");
                        })

                    })
                })
                break;
            case 'haslo':
                var crypto = require("crypto");
                var sha256 = crypto.createHash("sha256");
                sha256.update(req.body.haslo_stare, "utf")
                resul = sha256.digest("base64");
                var sha256_1 = crypto.createHash("sha256");
                sha256_1.update(req.body.haslo_nowe, "utf")
                resul_1 = sha256_1.digest("base64");
                con.getConnection((err, connection) => {
                    connection.query(`SELECT haslo FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                        if (err) {
                            connection.release();
                            return res.send(err)
                        }
                        if (resul != row.map((item) => item.haslo)) {
                            connection.release();
                            return res.redirect("/profil?error=haslo");
                        }
                        con.query(`UPDATE uzytkownicy SET haslo = '${resul_1}' WHERE ID = ${req.cookies.user}`, (err, row) => {
                            if (err) {
                                connection.release();
                                return res.send(err);
                            }
                            connection.release();
                            return res.redirect("/profil?udane=haslo");
                        })

                    })
                })
                break;
            case 'ustawienia':
                con.getConnection((err, connection) => {
                    connection.query(`SELECT ustawienia FROM uzytkownicy WHERE ID = ${req.cookies.user}`, (err, row) => {
                        if (err) {
                            connection.release();
                            return res.send(err)
                        }
                        let final = {};
                        final.email = req.body.email == 'on' ? true : false;
                        final.popout = req.body.popout == 'on' ? true : false;
                        final.strona = req.body.strona == 'on' ? true : false;
                        connection.query(`UPDATE uzytkownicy SET ustawienia = '${JSON.stringify(final)}' WHERE ID = ${req.cookies.user}`);
                        connection.release();
                        return res.redirect("/profil")
                    })
                })
                break;

        }
    })

module.exports = app;