'use strict';

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'test124',
});

client.connect();

module.exports = { client };
