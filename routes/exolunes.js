const express = require('express');
const router = express.Router();

const exolunesList = require("../models/exolunes");


router.get('/', (req, res) => {
    console.log("Je passe par la route /exolunes");
    // Exolunes list variable
    // pass Exolunes list to view
    res.render('exolunes.hbs', {exolunesList});
});

module.exports = router;