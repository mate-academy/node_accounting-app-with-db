'use strict';

const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Dnb10j1981r!',
});

client.connect();

module.exports = { client };
