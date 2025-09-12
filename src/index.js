// index.js
'use strict';
const { createServer } = require('./createServer');
const { sequelize } = require('./db.js');

(async () => {
  try {
    await sequelize.sync({ alter: true }); // tworzy tabele lub aktualizuje schemat
    createServer().listen(5700, () => {
      console.log('Server is running on localhost:5700');
    });
  } catch (err) {
    console.error('Unable to connect to DB', err);
  }
})();
