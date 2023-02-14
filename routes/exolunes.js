const express = require('express');
const router = express.Router();

const exolunesList = require("../models/Exolunes");

router.get('/', (req, res) => {
    console.log("Je passe par la route /exolunes");
    // Exolunes list variable
    // pass Exolunes list to view
    res.render('exolunes/index.hbs', {exolunesList});
});

module.exports = router;