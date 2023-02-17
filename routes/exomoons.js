const express = require('express');
const router = express.Router();

const Exomoons = require("../models/Exomoons");

router.get('/', async (req, res) => {
    try {
        let {rows} = await Exomoons.getAll()
        res.render('exomoons/index.hbs', {exomoonsList: rows})
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;