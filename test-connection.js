/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('accounting_app', 'lidacimborovic', '', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: console.log,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected successfully');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  } finally {
    await sequelize.close();
  }
})();
