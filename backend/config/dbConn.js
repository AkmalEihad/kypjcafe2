const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "123ikhwan",
    host: "localhost",
    port: 5432,
    database: "kypjcafe"
});

module.exports = pool;