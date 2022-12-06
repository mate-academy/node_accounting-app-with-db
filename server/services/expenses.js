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

// function updateExpense(expenses, id, body) {
//   const foundExpense = getExpenseById(expenses, id);

//   if (foundExpense) {
//     Object.assign(foundExpense, body);

//     return foundExpense;
//   } else {
//     return null;
//   }
// }

async function updateExpense(name, amount, category, note, id) {
  return await Expense.update({name, amount, category, note}, {
    where: { id },
  })
}

// function createExpense(expenses, userId, spentAt,
//   title, amount, category, note) {
//   const newExpenses = {
//     id: expenseId++,
//     userId,
//     spentAt,
//     title,
//     amount,
//     category,
//     note,
//   };

//   expenses.push(newExpenses);

//   return newExpenses;
// }

async function createExpense(user_id, name, amount, category, note) {
  return await Expense.create({user_id, name, amount, category, note})
}

async function getExpenseByUser(userId) {
  return await Expense.findAll({
    where: {
      user_id: userId,
    }
  })
}

function getExpensesByCat(expenses, category) {
  const filteredExpenses = expenses
    .filter(expense => expense.category === category);

  return filteredExpenses;
}

function getExpenseByTime(expenses, from, to) {
  const newExpenses = expenses.filter(
    (expense) => expense.spentAt >= from && expense.spentAt <= to);

  return newExpenses;
}

module.exports = {
  getExpenseById,
  updateExpense,
  createExpense,
  getExpenseByUser,
  getExpensesByCat,
  getExpenseByTime,
  Expense,
  getAllExpenses,
  deleteOneExpense,
};
