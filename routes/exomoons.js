const express = require('express');
const router = express.Router();

const Exomoons = require("../models/Exomoons");
router.get('/', function (req, res) {
    Exomoons.getAll()
        .then(data => res.render('exomoons/index.hbs', {exomoonsList: data.rows}))
        .catch(err => res.status(400).json(err))
})

module.exports = router;