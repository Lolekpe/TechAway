var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.query.failedLogin) {
        console.log("xd")
        return res.render('login', { message: `<div class="jedendwatrzy">Zle dane logowania!</div>` })
    }
    res.render("login", { message: "" })
})

module.exports = router;