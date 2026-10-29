const { models } = require('./models.js');
const { User, Expense } = models;

User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'cascade' });
Expense.belongsTo(User, { foreignKey: 'userId' });
