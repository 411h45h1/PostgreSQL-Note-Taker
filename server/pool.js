const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "***your pass***",
  host: "localhost",
  port: 5432,
  database: "notedb",
});

module.exports = pool;
