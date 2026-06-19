/* eslint-disable no-console */
const { sequelize } = require('./db');

require('./models/models.js');

async function syncModels() {
  try {
    await sequelize.sync({ force: true });
    console.log('Modele sincronizate');
  } catch (error) {
    console.error('Eroare la sincronizarea modelelor:', error);
  } finally {
    // Inchidem conexiunea cu BD
    await sequelize.close();
  }
}

syncModels();
