'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Koreathebest145!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 8080,
});

// const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'Koreathebest145!',
//   database: 'postgres',
//   port: 8080,
// });

// async function connectToDatabase() {
//   await client.connect();
// }

// connectToDatabase();

module.exports = { sequelize };
