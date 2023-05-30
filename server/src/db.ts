const Pool = require("pg").Pool;

const poolDb = new Pool({
    user: "postgres",
    password: "alpapiyush",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = poolDb;