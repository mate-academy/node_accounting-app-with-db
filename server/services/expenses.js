'use strict';

const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db");
const { User } = require("./users");

const Expense = sequelize.define('Expense', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // ? 'User'
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'expenses',
});

User.hasMany(Expense, { foreignKey: 'user_id' });
Expense.belongsTo(User, { foreignKey: 'user_id' });

async function getAllExpenses() {
  return await Expense.findAll({
    order: ['createdAt']
  });
}

async function deleteOneExpense(id) {
  return await Expense.destroy({
    where: {id},
  })
}


async function getExpenseById(id) {
  return await Expense.findByPk(id) || null;
}

async function updateExpense(name, amount, category, note, id) {
  return await Expense.update({name, amount, category, note}, {
    where: { id },
  })
}

async function createExpense(user_id, name, amount, category, note) {
  return await Expense.create({user_id, name, amount, category, note})
}

module.exports = {
  getExpenseById,
  updateExpense,
  createExpense,
  Expense,
  getAllExpenses,
  deleteOneExpense,
};
