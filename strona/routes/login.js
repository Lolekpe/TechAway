var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.query.failedLogin) {
        return res.render('login', { message: `<div class="jedendwatrzy">Zle dane logowania!</div>`, stage: "TechAway | Logowanie" });
    }
    if (req.query.register) {
        return res.render('login', { message: `<div class="jedendwatrzy">Pomyślnie zarejestrowano, zaloguj się!</div>`, stage: "TechAway | Logowanie" });
    }
    switch (req.query.akcja) {
        case 'wylogowanie':
            return res.render('login', { message: `<div class="jedendwatrzy">Zostałeś/aś pomyślnie wylogowany/a</div>`, stage: "TechAway | Logowanie" });
            
        case 'usun':
            return res.render('login', { message: `<div class="jedendwatrzy">Twoje konto zostało usunięte</div>`, stage: "TechAway | Logowanie" })
    }
    res.render("login", { message: "", stage: "TechAway | Logowanie" });
})

module.exports = router;