var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  if (!req.cookies.logged) {
    return res.render("login", { message: `<div class="jedendwatrzy">Aby przejść dalej zaloguj się!</div>`, stage: "TechAway | Strona Główna" });

  }

  res.render('index', { stage: "TechAway | Strona Główna" });
});

module.exports = router;
