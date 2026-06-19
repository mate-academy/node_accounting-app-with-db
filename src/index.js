/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');

const { sequelize } = require('./db.js');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Підключення до PostgreSQL успішне!');

    // Створює таблицю, якщо її немає
    await sequelize.sync({ alter: true });
    console.log('Таблиці синхронізовані!');
  } catch (err) {
    console.error('Помилка підключення:', err);
  }
})();

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
