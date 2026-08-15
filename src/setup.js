const { sequelize } = require('./db.js');

await sequelize.sync({ force: true });
