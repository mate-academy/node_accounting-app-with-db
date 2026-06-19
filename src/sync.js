/* eslint-disable no-console */
const { sequelize } = require('./db');

async function syncModels() {
  try {
    await sequelize.sync({ force: true });
    console.log('Модели синхронизированы');
  } catch (error) {
    console.error('Ошибка синхронизации моделей:', error);
  } finally {
    // Закрытие соединения с базой данных
    await sequelize.close();
  }
}

syncModels();
