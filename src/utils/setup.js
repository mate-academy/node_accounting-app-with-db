const { sequelize } = require('../db');

require('../users/user.model');
require('../expenses/expense.model');

const synchronize = async () => {
  await sequelize.sync({ force: true });
};

synchronize();
