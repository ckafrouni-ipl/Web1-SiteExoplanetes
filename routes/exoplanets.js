const express = require('express');
const router = express.Router();

const exoplanetsTable = require("../models/exoplanets");

/* GET index. */
router.get('/', function (req, res, next) {
    res.render('indexExoplanet.hbs', {exoplanetsTable});
});


/* POST add exoplanet. */
router.post('/add', function (req, res, next) {
    console.log("POST ADD EXOPLANET");
    const id = exoplanetsTable.length + 1;
    exoplanetsTable.push({
        id: id,
        uniqueName: req.body.uniqueNameExoplanet,
        hClass: req.body.hClassExoplanet,
        // parseInt to change string to int
        discoveryYear: parseInt(req.body.discoveryYearExoplanet)
    });
    res.redirect('back');
});


/* GET search exoplanet. */
router.get('/search', function (req, res, next) {
    console.log("GET SEARCH EXOPLANET");
    const uniqueNameExoplanetParam = req.query.uniqueNameExoplanet;
    let min3charOK = false;
    let exoplanetFound = null;
    if (uniqueNameExoplanetParam.length >= 3) {
        min3charOK = true;
        for (let exoplanet of exoplanetsTable) {
            if (exoplanet.uniqueName.toUpperCase().startsWith(uniqueNameExoplanetParam.toUpperCase())) {
                console.log("trouvé");
                exoplanetFound = exoplanet;
                // stop the loop !
                break;
            }
        }
    }
    res.render('indexExoplanet.hbs', {exoplanetsTable, min3charOK, exoplanet: exoplanetFound});
});


/* GET details exoplanet. */
router.get('/details', function (req, res, next) {
    console.log("GET DETAILS EXOPLANET");

    // convert string req.query.id to int
    // another solution is to use == instead of === in if instruction
    const exoplanetIdParam = parseInt(req.query.id);
    let id_error = false;
    let exoplanetFound = null;

    console.log("exoplanetIdParam : " + exoplanetIdParam);

    if (isNaN(exoplanetIdParam)) {
        id_error = true;
    } else {

        for (let exoplanet of exoplanetsTable) {
            if (exoplanet.id === exoplanetIdParam) {
                exoplanetFound = exoplanet;
                console.log("trouvé : " + exoplanet.id);
                break;
            }
        }
    }
    res.render('details.hbs', {id_error, exoplanet: exoplanetFound});

});


/* GET search exoplanet. */
router.get('/filter', function (req, res, next) {
    const filter = req.query.filter;
    let exoplanetsTableFilter = [];
    if (filter === "Filtrer par hclass") {
        console.log("GET FILTER EXOPLANET HCLASS");
        for (const exoplanet of exoplanetsTable) {
            if (exoplanet.hClass === req.query.hClassExoplanet) {
                console.log("trouvé" + exoplanet.uniqueName);
                exoplanetsTableFilter.push(exoplanet);
            }
        }
    }
    if (filter === "Filtrer par année") {
        console.log("GET FILTER EXOPLANET ANNEE");
        for (const exoplanet of exoplanetsTable) {
            const discoveryYearParam = parseInt(req.query.discoveryYearExoplanet);
            if (exoplanet.discoveryYear === discoveryYearParam) {
                console.log("trouvé" + exoplanet.uniqueName);
                exoplanetsTableFilter.push(exoplanet);
            }
        }
    }
    // param exoplanetsTable must be the same but with a different value (table filtering)
    res.render('indexExoplanet.hbs', {exoplanetsTable: exoplanetsTableFilter});
});


module.exports = router;