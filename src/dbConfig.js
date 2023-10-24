'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'your-database-name',
  password: 'your-password',
  port: 5432,
});

module.exports = pool;
