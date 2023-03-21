var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    if (!req.cookies.logged) {
        return res.redirect('/');
    }

    res.send("XD");
})

module.exports = router;