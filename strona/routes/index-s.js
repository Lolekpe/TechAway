var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("hello my nigga");
})

module.exports = router;