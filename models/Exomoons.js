const db = require("../db")

function getAll() {
    return db.query(`
        SELECT * FROM exoplanets.exomoons
        `,)
}

module.exports = {
    getAll
};