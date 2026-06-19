const { sequelize } = require('./src/db');
const { models } = require('./src/models/models');

sequelize
  .sync({ force: true })
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Database synchronized');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error synchronizing database:', err);
  });
