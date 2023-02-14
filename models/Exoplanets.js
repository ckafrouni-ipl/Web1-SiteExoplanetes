const exoplanetsTable = [
    {
        id: 1,
        uniqueName: "TRAPPIST-1-d",
        hClass: "Mésoplanète",
        discoveryYear: 2016,
        ist: 0.9,
        pClass: "Sous-terrienne chaude"
    },
    {
        id: 2,
        uniqueName: "KOI-1686.01",
        hClass: "Mésoplanète",
        discoveryYear: 2011,
        ist: 0.89,
        pClass: "Super-terrienne chaude"
    },
    {
        id: 3,
        uniqueName: "LHS 1723 b",
        hClass: "Mésoplanète",
        discoveryYear: 2017,
        ist: 0.89,
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

function searchByUniqueName(uniqueName) {
    for (let exoplanet of exoplanetsTable) {
        if (exoplanet.uniqueName.toUpperCase().startsWith(uniqueName.toUpperCase())) {
            return exoplanet;
        }
    }
    return null;
}

function findById(exoplanetIdParam) {
    let id_error = false;
    let exoplanetFound = null;

    if (isNaN(exoplanetIdParam)) {
        id_error = true;
    } else {

        for (let exoplanet of exoplanetsTable) {
            if (exoplanet.id === exoplanetIdParam) {
                exoplanetFound = exoplanet;
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

    let exoplanetsTableFilter = [];
    for (const exoplanet of exoplanetsTable) {
        if (exoplanet.hClass === hClass) {
            exoplanetsTableFilter.push(exoplanet);
        }
    }

    return exoplanetsTableFilter;
}

function getFilteredByDiscoveryYear(discoveryYear) {
    let exoplanetsTableFilter = [];

    for (const exoplanet of exoplanetsTable) {
        if (exoplanet.discoveryYear === discoveryYear) {
            exoplanetsTableFilter.push(exoplanet);
        }
    }

    return exoplanetsTableFilter;
}

function update(obj) {
    const {id_error, exoplanet} = findById(obj.id);
    return Object.assign(exoplanet, exoplanet, obj);
}

module.exports = {
    add,
    getAll,
    searchByUniqueName,
    findById,
    getFilteredByHClass,
    getFilteredByDiscoveryYear,
    update,
};