const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "@Mypasswallahi1",
  host: "localhost",
  port: 5432,
  database: "notedb",
});

module.exports = pool;
