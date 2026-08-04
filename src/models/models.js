'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.beforeBulkDestroy((options) => {
  if (options.truncate) {
    options.cascade = true;
  }
});

module.exports = {
  models: { User, Expense },
};
