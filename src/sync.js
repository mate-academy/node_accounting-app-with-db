/* eslint-disable no-console */
const { sequelize } = require('./db');

async function syncModels() {
  try {
    await sequelize.sync({ force: true });
    console.log('Models synchronized');
  } catch (error) {
    console.error('Models was not synchronized:', error);
  } finally {
    await sequelize.close();
  }
}

syncModels();
