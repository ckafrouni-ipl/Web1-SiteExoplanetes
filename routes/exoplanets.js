const express = require('express');
const router = express.Router();

const Exoplanet = require("../models/Exoplanets");

router.get('/', function (req, res) {
    res.render('exoplanets/index.hbs', {
        exoplanetsTable: Exoplanet.getAll()
    });
});


router.post('/add', function (req, res) {
    Exoplanet.add({
        uniqueName: req.body.uniqueName,
        hClass: req.body.hClass,
        discoveryYear: parseInt(req.body.discoveryYear)
    });

    res.redirect('back');
});


router.get('/search', function (req, res) {
    let params;

    if (req.query.uniqueName.length < 3)  {
        params = {min3char: true,}
    } else {
        params = {exoplanet: Exoplanet.searchByUniqueName(req.query.uniqueName),}
    }

    res.render('exoplanets/index.hbs', {
        exoplanetsTable: Exoplanet.getAll(),
        ...params,
    });
});


router.get('/details', function (req, res) {
    const searchQuery = Exoplanet.findById(parseInt(req.query.id));

    res.render('exoplanets/details.hbs', {
        id_error: searchQuery.id_error,
        exoplanet: searchQuery.exoplanet
    });
});


router.get('/filter', function (req, res) {

    const exoplanetsTable = req.query.filter === 'Filtrer par hclass' ?
        Exoplanet.getFilteredByHClass(req.query.hClass)
        : Exoplanet.getFilteredByDiscoveryYear(parseInt(req.query.discoveryYear));

    res.render('exoplanets/index.hbs', {exoplanetsTable});
});

router.get('/update', function (req, res) {
    const searchQuery = Exoplanet.findById(parseInt(req.query.id));

    res.render('exoplanets/update.hbs', {
        id_error: searchQuery.id_error,
        exoplanet: searchQuery.exoplanet
    });
});

router.post('/update', function (req, res) {

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