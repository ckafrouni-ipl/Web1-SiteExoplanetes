const exoplanetsTable = [
    {
        id: 1,
        uniqueName: "TRAPPIST-1-d",
        hClass: "Mésoplanète",
        discoveryYear: 2016,
        IST: 0.9,
        pClass: "Sous-terrienne chaude"
    },
    {
        id: 2,
        uniqueName: "KOI-1686.01",
        hClass: "Mésoplanète",
        discoveryYear: 2011,
        IST: 0.89,
        pClass: "Super-terrienne chaude"
    },
    {
        id: 3,
        uniqueName: "LHS 1723 b",
        hClass: "Mésoplanète",
        discoveryYear: 2017,
        IST: 0.89,
        pClass: "Super-terrienne chaude"
    },
];

function getAll() {
    return exoplanetsTable;
}

function add(obj) {
    exoplanetsTable.push({
        id: exoplanetsTable.length + 1,
        uniqueName: obj.uniqueName,
        hClass: obj.hClass,
        discoveryYear: parseInt(obj.discoveryYear)
    });
}

function searchByUniqueName(uniqueNameExoplanet) {
    let min3charOK = false;
    let exoplanetFound = null;
    if (uniqueNameExoplanet.length >= 3) {
        min3charOK = true;
        for (let exoplanet of exoplanetsTable) {
            if (exoplanet.uniqueName.toUpperCase().startsWith(uniqueNameExoplanet.toUpperCase())) {
                console.log("trouvé");
                exoplanetFound = exoplanet;
                break;
            }
        }
    }
    return {min3charOK, exoplanet: exoplanetFound}
}

function findById(exoplanetIdParam) {
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

    return {
        id_error,
        exoplanet: exoplanetFound,
    }

}

function getFilteredByHClass(hClass) {
    console.log("GET FILTER EXOPLANET HCLASS");

    let exoplanetsTableFilter = [];
    for (const exoplanet of exoplanetsTable) {
        if (exoplanet.hClass === hClass) {
            console.log("trouvé" + exoplanet.uniqueName);
            exoplanetsTableFilter.push(exoplanet);
        }
    }

    return exoplanetsTableFilter;
}

function getFilteredByDiscoveryYear(discoveryYear) {
    console.log("GET FILTER EXOPLANET ANNEE");

    let exoplanetsTableFilter = [];
    for (const exoplanet of exoplanetsTable) {
        if (exoplanet.discoveryYear === discoveryYear) {
            console.log("trouvé" + exoplanet.uniqueName);
            exoplanetsTableFilter.push(exoplanet);
        }
    }

    return exoplanetsTableFilter;
}

module.exports = {
    add,
    getAll,
    searchByUniqueName,
    findById,
    getFilteredByHClass,
    getFilteredByDiscoveryYear,
};