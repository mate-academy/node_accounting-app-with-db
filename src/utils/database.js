'use strict';

const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const ssl = process.env.NODE_ENV === 'production'
  ? { rejectUnauthorized: false } : false;

const client = new Client({
  connectionString: connectionString,
  ssl: ssl,
});

client.connect();

module.exports = client;
