'use strict';

const { Sequelize } = require('sequelize');
const { Client } = require('pg');

const utils = require('util');

// Needed for testing purposes, do not remove
require('dotenv').config();
global.TextEncoder = utils.TextEncoder;

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

const sequelize = new Sequelize({
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  host: POSTGRES_HOST || 'localhost',
  dialect: 'postgres',
  port: POSTGRES_PORT || 5432,
  password: POSTGRES_PASSWORD || '11112222',
});

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '11112222',
  database: 'postgres',
});

async function initConnection() {
  try {
    await client.connect();
  } catch (err) {
    throw err;
  }
}

initConnection();

module.exports = {
  sequelize,
  client,
};
