/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
'use strict';

const { sequelize } = require('./db');

require('../models/userModel');
require('../models/expenseModel');

// Synchronize the models with the database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database and tables synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
