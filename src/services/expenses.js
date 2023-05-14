'use strict';

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
});

function normalize({ id, userId, title, spentAt, amount, category, note }) {
  return {
    id, userId, title, spentAt, amount, category, note,
  };
}

function getAll() {
  try {
    return Expense.findAll({
      order: ['userId', 'createdAt'],
    });
  } catch (error) {
    return false;
  }
}

function getById(expenseId) {
  try {
    return Expense.findByPk(expenseId);
  } catch (error) {
    return false;
  }
}

function create(data) {
  try {
    const newExpense = {
      ...data,
    };

    return Expense.create(newExpense);
  } catch (error) {
    return false;
  }
}

function remove(expenseId) {
  try {
    return Expense.destroy({
      where: {
        id: expenseId,
      },
    });
  } catch (error) {
    return false;
  }
}

function update(id, fieldsToUpdate) {
  try {
    return Expense.update({
      id, ...fieldsToUpdate,
    }, {
      where: { id },
    });
  } catch (error) {
    return false;
  }
}

function getAllForUser(userId) {
  try {
    return Expense.findAll({
      where: {
        userId: {
          [Op.eq]: userId,
        },
      },
      order: ['createdAt'],
    });
  } catch (error) {
    return false;
  }
}

function getAllForCategory(userId, category) {
  try {
    return Expense.findAll({
      where: {
        [Op.and]: [
          { userId },
          { category },
        ],
      },
      order: [['userId'], ['createdAt']],
    });
  } catch (error) {
    return false;
  }
}

function getAllBetweenDates(from, to) {
  return Expense.findAll({
    where: {
      spentAt: {
        [Op.and]: {
          [Op.gte]: from,
          [Op.lte]: to,
        },
      },
    },
    order: ['userId', 'createdAt'],
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  getAllForUser,
  getAllForCategory,
  getAllBetweenDates,
  normalize,
  Expense,
};
