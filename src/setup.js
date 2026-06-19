const { sequelize } = require('./db.js');

async function setupDatabase() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    process.exit(1);
  }
}

setupDatabase();
