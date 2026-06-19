/* eslint-disable no-console */
const { Category } = require('./models/Category.model');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

async function setupDatabase() {
  try {
    await User.sync({ force: true });
    await Expense.sync({ force: true });
    await Category.sync({ force: true });

    User.hasMany(Expense, { foreignKey: 'userId' });
    Expense.belongsTo(User, { foreignKey: 'userId' });

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}

module.exports = { setupDatabase };

if (require.main === module) {
  setupDatabase();
}
