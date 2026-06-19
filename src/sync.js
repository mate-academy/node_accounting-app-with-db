/* eslint-disable no-console */
// sync.ts
const { sequelize } = require('./db');

(async () => {
  try {
    console.log(`🔗 Підключення до БД:`, sequelize.config.database);
    await sequelize.authenticate();
    console.log('✅ Підключення до бази даних успішне.');

    await sequelize.sync({ force: true });
    console.log('✅ Таблиці створені.');
  } catch (error) {
    console.error('❌ Помилка підключення або синхронізації:', error);
  } finally {
    await sequelize.close();
  }
})();
