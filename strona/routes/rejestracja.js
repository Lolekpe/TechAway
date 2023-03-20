var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.query.failed) {
        console.log("xd")
        return res.render('rejestracja', { message: `<div class="jedendwatrzy">Informacje które podałeś są już w bazie danych!</div>`, stage: "TechAway | Rejestracja" })
    }
    res.render("rejestracja", { message: "", stage: "TechAway | Rejestracja" })
})

module.exports = router;