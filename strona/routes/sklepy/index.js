var express = require("express");
var app = express();

app.route('/')
    .get((req, res, next) => { 
        res.render("sklepy/index")
    })
    .post((req, res) => {

    });

module.exports = app;