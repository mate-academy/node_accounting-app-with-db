'use strict';

const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '9444549444',
});

client.connect();

module.exports = {
  client,
};
