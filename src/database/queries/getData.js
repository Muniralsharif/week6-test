// Add code below to query your database
const dbConnection = require('../db_connection')

const getCities = cb => {
    dbConnection.query('SELECT * FROM cities ', (err, res) => {
        if (err) {
            return cb(err)

        }
        cb(null, res.rows)
    })
}
module.exports = getCities;