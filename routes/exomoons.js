const express = require('express');
const router = express.Router();

const exomoonsList = require("../models/Exomoons");

router.get('/', (req, res) => {
    res.render('exomoons/index.hbs', {exomoonsList});
});

module.exports = router;