'use strict';

// const pg = require('pg');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'test123', {
  host: 'localhost',
  dialect: 'postgres',
});

// const client = new pg.Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'test123',
// });

// // client.connect();
// async function connectToDb() {
//   await client.connect();
// }

// connectToDb();

module.exports = {
  // connectToDb,
  // client,
  sequelize,
};
