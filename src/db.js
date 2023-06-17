'use strict'

require('dotenv/config');

const postgres = require('postgres');

const sql = postgres({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'accounting_app_db',
});

module.exports = { db: sql };
