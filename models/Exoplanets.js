const db = require("../db")

function getAll() {
    return db.query(`
        SELECT *
        FROM exoplanets.exoplanets
    `,)
}

function add(obj) {
    return db.query(`
        INSERT INTO exoplanets.exoplanets (unique_name, h_class, discovery_year)
        VALUES ($1, $2, $3);
    `, [obj.unique_name, obj.h_class, obj.discovery_year])
}

function findByUniqueName(unique_name) {
    return db.query(`
        SELECT *
        FROM exoplanets.exoplanets
        WHERE unique_name ILIKE $1
    `, [unique_name])
}

function findById(exoplanetIdParam) {
    return db.query(`
        SELECT *
        FROM exoplanets.exoplanets
        WHERE id = $1
    `, [exoplanetIdParam])
}

function filterByHClass(hClass) {
    return db.query(`
                SELECT *
                FROM exoplanets.exoplanets
                WHERE h_class ILIKE $1;
        `, [hClass]
    )
}

function filterByDiscoveryYear(discoveryYear) {
    return db.query(`
                SELECT *
                FROM exoplanets.exoplanets
                WHERE discovery_year = $1;
        `, [discoveryYear]
    )
}

function update(id, obj) {
    return db.query(`
                UPDATE exoplanets.exoplanets
                SET unique_name=$2,
                    h_class=$3,
                    discovery_year=$4,
                    ist=$5,
                    p_class=$6
                WHERE id = $1;
        `, [id, obj.unique_name, obj.h_class, obj.discovery_year, obj.ist, obj.p_class]
    )
}

module.exports = {
    add, getAll, findByUniqueName, findById, filterByHClass, filterByDiscoveryYear, update,
}