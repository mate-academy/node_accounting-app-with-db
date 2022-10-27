'use strict';

const pkg = require('pg');

const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
});

client.connect();

module.exports = { client };
