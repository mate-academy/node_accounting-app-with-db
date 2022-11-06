'use strict';

const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1711',
});

client.connect();

module.exports = { client };
