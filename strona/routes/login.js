var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.query.failedLogin) {
        console.log("xd")
        return res.render('login', { message: `<p><span>Zle dane logowania!<span><p>` })
    }
    res.render("login", { message: "" })
})

module.exports = router;