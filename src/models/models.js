const { Sequelize, DataTypes } = require('sequelize');

const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest
  ? new Sequelize('sqlite::memory:', { logging: false }) // dla testów
  : new Sequelize(process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/dbname', {
      logging: console.log,
    });

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Expense = sequelize.define('Expense', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
});

// Relacje
User.hasMany(Expense);
Expense.belongsTo(User);

Category.hasMany(Expense);
Expense.belongsTo(Category);

const initDB = async () => {
  await sequelize.sync({ force: isTest }); // testy w pamięci = force
};

module.exports = {
  models: { User, Expense, Category },
  sequelize,
  initDB,
};
