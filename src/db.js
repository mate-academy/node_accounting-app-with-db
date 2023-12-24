'use strict';

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'dima2004',
  database: 'postgres',
});

module.exports = client;
