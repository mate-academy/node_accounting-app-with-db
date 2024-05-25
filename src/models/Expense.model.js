const { getUserById } = require('./User.model');
const { sequelize } = require('../db');
const { DataTypes, Op } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
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
      defaultValue: '',
    },
    note: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: null,
    },
  },
  {
    tableName: 'expenses',
  },
);

function normalizeExpense({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

function getAllExpenses() {
  return Expense.findAll();
}

function getAllExpensesByParams(params) {
  if ('categories' in params) {
    let category;
    const DBparams = [];

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'categories') {
        category = value.split(',');

        return;
      }

      DBparams.push({ [key]: value });
    });

    return Expense.findAll({
      where: {
        [Op.and]: DBparams,
        category: {
          [Op.or]: category,
        },
      },
    });
  }

  if ('from' in params) {
    return Expense.findAll({
      where: {
        spentAt: {
          [Op.gte]: new Date(params.from),
          [Op.lte]: new Date(params.to),
        },
      },
    });
  }

  const paramsForDB = Object.entries(params).map(([key, value]) => ({
    [key]: value,
  }));

  return Expense.findAll({
    where: {
      [Op.and]: paramsForDB,
    },
  });
}

async function postExpense(data) {
  const user = await getUserById(data.userId);

  if (!user) {
    return;
  }

  return Expense.create(data);
}

function getExpenseById(id) {
  return Expense.findByPk(id);
}

function deleteExpenseById(id) {
  return Expense.destroy({ where: { id } });
}

async function updateExpenseById(id, data) {
  await sequelize.transaction(async (t) => {
    await Expense.update(data, { where: { id } }, { transaction: t });
  });

  return Expense.findByPk(id);
}

module.exports = {
  getAllExpenses,
  postExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
  normalizeExpense,
  getAllExpensesByParams,
  Expense,
};
