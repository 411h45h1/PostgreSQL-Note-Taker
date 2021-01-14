import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "@Mypasswallahi1",
  host: "localhost",
  port: 5432,
  database: "noteDB",
});

export default pool;
