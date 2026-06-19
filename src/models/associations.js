const { Expense } = require("./Expense.model");
const { User } = require("./User.model");

User.hasMany(Expense, { foreignKey: 'userId' });

Expense.belongsTo(User, { foreignKey: 'userId' });