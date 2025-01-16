const { sequelize } = require('./db.js');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

User.hasMany(Expense, {
  foreignKey: 'userId',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
});

async function setupDatabase() {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    process.exit(1);
  }
}

setupDatabase();
