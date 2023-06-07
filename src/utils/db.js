/* eslint-disable no-console */
'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Table created');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });

module.exports = {
  sequelize,
};
