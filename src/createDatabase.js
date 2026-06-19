'use strict';
/* eslint-disable */

const { Sequelize } = require('sequelize');

require('dotenv').config();

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const createDatabase = async () => {
  // Connect to default postgres database first
  const sequelize = new Sequelize({
    database: 'postgres',
    username: POSTGRES_USER || 'postgres',
    host: POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    port: Number(POSTGRES_PORT) || 5432,
    password: POSTGRES_PASSWORD || '123',
  });

  try {
    await sequelize.authenticate();

    // Create the accounting_app database
    await sequelize.query('CREATE DATABASE accounting_app;');
  } catch (error) {
    // Check for Postgres error code 42P04 (database already exists)
    if (error.original?.code === '42P04') {
      // Database already exists
    } else {
      console.error('Error creating database:', error.message);
      throw error;
    }
  } finally {
    await sequelize.close();
  }
};

module.exports = { createDatabase };

// Run if called directly
if (require.main === module) {
  createDatabase()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}
