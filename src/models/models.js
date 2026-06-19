'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');
const { sequelize } = require('../db');

// Define relationships with CASCADE delete
User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
});

// Relationship between Category and Expense
Category.hasMany(Expense, {
  foreignKey: 'categoryId',
  onDelete: 'SET NULL',
});

Expense.belongsTo(Category, {
  foreignKey: 'categoryId',
});

// Make sure tables are synced with the right constraints
async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    // Handle error silently
  }
}

syncModels();

module.exports = {
  models: {
    User,
    Expense,
    Category,
  },
};
