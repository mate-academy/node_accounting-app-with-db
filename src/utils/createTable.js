/* eslint-disable no-console */
'use strict';

const { sequelize } = require('../utils/db');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Table created');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });
