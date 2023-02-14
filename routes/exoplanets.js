const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/Exoplanets");

router.get('/', function (req, res, next) {
    res.render('exoplanets/index.hbs', {
        exoplanetsTable: Exoplanet.getAll()
    });
});


router.post('/add', function (req, res, next) {
    console.log("POST ADD EXOPLANET");

    Exoplanet.add({
        uniqueName: req.body.uniqueNameExoplanet,
        hClass: req.body.hClassExoplanet,
        discoveryYear: parseInt(req.body.discoveryYearExoplanet)
    });

    res.redirect('back');
});


router.get('/search', function (req, res, next) {
    console.log("GET SEARCH EXOPLANET");

    const exoplanetSearch = Exoplanet.searchByUniqueName(req.query.uniqueNameExoplanet);

    res.render('exoplanets/index.hbs', {
        exoplanetsTable: Exoplanet.getAll(),
        min3charOK: exoplanetSearch.min3charOK,
        exoplanet: exoplanetSearch.exoplanet
    });
});


router.get('/details', function (req, res, next) {
    console.log("GET DETAILS EXOPLANET");

    const searchQuery = Exoplanet.findById(parseInt(req.query.id));

    res.render('exoplanets/details.hbs', {
        id_error: searchQuery.id_error,
        exoplanet: searchQuery.exoplanet
    });
});


router.get('/filter', function (req, res, next) {

    const exoplanetsTable = req.query.filter === 'Filtrer par hclass' ?
        Exoplanet.getFilteredByHClass(req.query.hClassExoplanet)
        : Exoplanet.getFilteredByDiscoveryYear(parseInt(req.query.discoveryYearExoplanet));

    res.render('exoplanets/index.hbs', {exoplanetsTable});
});

router.get('/update', function (req, res, next) {
    const searchQuery = Exoplanet.findById(parseInt(req.query.id));

    res.render('exoplanets/update.hbs', {
        id_error: searchQuery.id_error,
        exoplanet: searchQuery.exoplanet
    });
});

router.post('/update', function (req, res, next) {

    let exoplanet = Exoplanet.update({
        id: parseInt(req.body.id),
        uniqueName: req.body.uniqueName,
        hClass: req.body.hClass,
        discoveryYear: parseInt(req.body.discoveryYear),
        ist: parseFloat(req.body.ist),
        pClass: req.body.pClass,
    });

    res.redirect('details?id=' + exoplanet.id);
})


module.exports = router;