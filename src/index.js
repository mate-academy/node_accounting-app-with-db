/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('❌ Не удалось подключиться к базе данных:', error);
  }
})();

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
