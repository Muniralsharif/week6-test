const dbConnection = require('../db_connection.js')

const postcities = (result, cb) => {
    dbConnection.query(`INSERT INTO cities (name,country) VALUES ($1,$2)`, [result.name, result.country], (err, res) => {
        console.log(result.name, result.country)
        if (err) {
            return cb(err);
        }
    
        cb(null, res.rows)
    })
}
module.exports = postcities;