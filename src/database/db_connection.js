
const { Pool } = require("pg");
require("env2")("config.env");

let DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV === "test") {
  console.log("here");
  DB_URL = process.env.DATABASE_URL;
}
if (!DB_URL) throw new Error("Enviroment variable DB_URL must be set");



const connectionString = DB_URL;

if (!connectionString) {
  throw new Error("please set a db_url env varaiable");
}

module.exports = new Pool({
  connectionString,

  ssl: !connectionString.includes("localhost")
});