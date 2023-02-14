const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/exoplanets");

/* GET index. */
router.get('/', function (req, res, next) {
    res.render('indexExoplanet.hbs', {
        exoplanetsTable: Exoplanet.getAll()
    });
});


/* POST add exoplanet. */
router.post('/add', function (req, res, next) {
    console.log("POST ADD EXOPLANET");

    Exoplanet.add({
        uniqueName: req.body.uniqueNameExoplanet,
        hClass: req.body.hClassExoplanet,
        discoveryYear: parseInt(req.body.discoveryYearExoplanet)
    });

    res.redirect('back');
});


/* GET search exoplanet. */
router.get('/search', function (req, res, next) {
    console.log("GET SEARCH EXOPLANET");

    const exoplanetSearch = Exoplanet.searchByUniqueName(req.query.uniqueNameExoplanet);

    res.render('indexExoplanet.hbs', {
        exoplanetsTable: Exoplanet.getAll(),
        min3charOK: exoplanetSearch.min3charOK,
        exoplanet: exoplanetSearch.exoplanet
    });
});


/* GET details exoplanet. */
router.get('/details', function (req, res, next) {
    console.log("GET DETAILS EXOPLANET");

    const searchQuery = Exoplanet.findById(parseInt(req.query.id));

    res.render('details.hbs', {
        id_error: searchQuery.id_error,
        exoplanet: searchQuery.exoplanet
    });
});


/* GET search exoplanet. */
router.get('/filter', function (req, res, next) {

    const exoplanetsTable = req.query.filter === 'Filtrer par hclass' ?
        Exoplanet.getFilteredByHClass(req.query.hClassExoplanet)
        : Exoplanet.getFilteredByDiscoveryYear(parseInt(req.query.discoveryYearExoplanet));

    res.render('indexExoplanet.hbs', {exoplanetsTable});
});


module.exports = router;