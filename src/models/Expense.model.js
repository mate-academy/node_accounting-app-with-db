'use strict';

const { sequelize } = require('../db.js');

const Expense = sequelize.define('Expense', {
  userId: { type: sequelize.Sequelize.INTEGER },
  spentAt: { type: sequelize.Sequelize.DATE },
  title: { type: sequelize.Sequelize.STRING },
  amount: { type: sequelize.Sequelize.FLOAT },
  category: { type: sequelize.Sequelize.STRING },
  note: { type: sequelize.Sequelize.TEXT },
});

module.exports = {
  Expense,
};
