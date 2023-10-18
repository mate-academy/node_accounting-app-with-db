'use strict';

const { sequelize } = require('../connectDb');
const { DataTypes, Op } = require('sequelize');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
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
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAllByQuery = async(query) => {
  const options = {
    order: ['id'],
  };

  if (query.userId) {
    options.where = {
      userId: query.userId,
    };
  }

  if (query.categoriesArray && query.categoriesArray.length) {
    options.where = {
      ...options.where,
      category: {
        [Op.in]: query.categoriesArray,
      },
    };
  }

  if (query.from) {
    options.where = {
      ...options.where,
      spentAt: {
        [Op.gte]: query.from,
      },
    };
  }

  if (query.to) {
    const spentAt = (options.where && 'spentAt' in options.where)
      ? {
        ...options.where.spentAt,
        [Op.lte]: query.to,
      }
      : { [Op.lte]: query.to };

    options.where = {
      ...options.where,
      spentAt,
    };
  }

  const expenses = await Expense.findAll(options);

  return expenses;
};

const add = async(expense) => {
  await Expense.create(expense);

  return expense;
};

const getById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const updateById = async(id, body) => {
  await Expense.update(body, { where: { id } });
};

module.exports = {
  getAllByQuery,
  add,
  getById,
  remove,
  updateById,
  Expense,
};
