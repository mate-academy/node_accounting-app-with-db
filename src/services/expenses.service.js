'use strict';

const { getNewId } = require('../utils/getNewId');

const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/db');

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
      defaultValue: '',
    },
  },
  {
    tableName: 'expenses',
  }
);

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getExpenses = async(userId, from, to, categories) => {
  let expensesToDisplay = await Expense.findAll();

  if (userId) {
    expensesToDisplay = expensesToDisplay.filter(
      (e) => e.userId === Number(userId)
    );
  }

  if (categories) {
    expensesToDisplay = expensesToDisplay.filter(
      (e) => e.category === categories
    );
  }

  if (from) {
    expensesToDisplay = expensesToDisplay.filter(
      (e) => Date.parse(e.spentAt) > Date.parse(from)
    );
  }

  if (to) {
    expensesToDisplay = expensesToDisplay.filter(
      (e) => Date.parse(e.spentAt) < Date.parse(to)
    );
  }

  return expensesToDisplay;
};

const getById = async(id) => {
  return Expense.findByPk(id);
};

const create = async(expenseData) => {
  const allExpenses = await getExpenses();
  const newId = getNewId(allExpenses) + 1;

  const newExpense = await Expense.create({
    id: newId,
    ...expenseData,
  });

  return newExpense;
};

const update = async(id, dataToUpdate) => {
  let expense = await getById(id);

  await Expense.update(
    { ...dataToUpdate },
    {
      where: {
        id: id,
      },
    }
  );

  expense = await getById(id);

  return expense;
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getExpenses,
  getById,
  create,
  update,
  remove,
  Expense,
  normalize,
};
