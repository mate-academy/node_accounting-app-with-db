const { sequelize } = require('../db.js');

async function sequelizeSync() {
  try {
    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log('Succsessfuly connected');
  } catch {
    // eslint-disable-next-line no-console
    console.error('Not connected to db');
    await sequelize.close();
  }
}

module.exports = { sequelizeSync };
