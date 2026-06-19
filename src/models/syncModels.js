/* eslint-disable no-console */
const { sequelize } = require('../db');

const syncDbWithModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к БД установлено');

    await sequelize.sync({ alter: true });
    console.log('✅ Схема базы синхронизирована');
  } catch (error) {
    console.error('❌ Ошибка подключения к БД:', error);
  }
};

module.exports = {
  syncDbWithModels,
};
