'use strict';

const { User } = require('./users.service.js');
const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db');
const { uuidv4 } = require('uuid');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

},
{
  tableName: 'expenses',
});

const normalize = (expense) => {
  const { id, title, amount, category, note } = expense;

  return {
    id, title, amount, category, note,
  };
};
const getExpenses = ({ userId, categories, from, to }) => {
  if (userId) {
    return Expense.findAll({
      where: {
        id: {
          [Op.eq]: userId,
        },
      },
    }).map(expense => normalize(expense));
  }

  if (categories) {
    return Expense.findAll({
      where: {
        categories: {
          [Op.contains]: categories,
        },
      },
    });
  }

  if (from) {
    return Expense.findAll({
      where: {
        spentAT: {
          [Op.gte]: from,
        },
      },
    });
  }

  if (to) {
    return Expense.findAll({
      where: {
        spentAT: {
          [Op.lte]: from,
        },
      },
    });
  }
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const addExpense = (expense) => {
  const { userId, spentAt, title, amount, category, note } = expense;
  const id = uuidv4();

  return User.create({
    id, userId, spentAt, title, amount, category, note,
  });
};

const deleteExpense = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  }
  );
};

const updateExpense = async({ id, title, amount, category, note }) => {
  await User.update({
    title, amount, category, note,
  }, { where: { id } });
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
  normalize,
  Expense,
};
