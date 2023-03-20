var express = require('express');
var router = express.Router();
var sql = require("mysql");
var con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'techaway'
})

/* GET home page. */
router.post('/', function(req, res) {
    con.connect(function() {
        con.query(`SELECT * FROM uzytkownicy WHERE email = '${req.body.email}' AND haslo = '${req.body.haslo}'`, (err, row) => {
            if(err) return console.log(err);
            if(row.length === 0) return res.send("xd")
            var x = [
                row.map((item) => item.email),
                row.map((item) => item.haslo),
                row.map((item) => item.imie),
                row.map((item) => item.nazwisko),
            ]

            console.log(row)
            res.send(x[2])
        });
    });

});

module.exports = router;