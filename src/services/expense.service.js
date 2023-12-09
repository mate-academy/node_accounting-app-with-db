'use strict';

const sequelize = require('../database/db');
const { DataTypes, UUIDV4, Op } = require('sequelize');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
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
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAll = async() => {
  const expense = await Expense.findAll();

  return expense;
};

const filterByPeriod = (from, to) => {
  return Expense.findAll({
    where: {
      spentAt: {
        [Op.gt]: from,
        [Op.lt]: to,
      },
    },
  });
};

const filterByCategory = (category) => {
  return Expense.findOne({
    where: {
      category,
    },
  });
};

const filterByUserId = (userId) => {
  return Expense.findByPk(userId);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = async(userId, spentAt, title, amount, category, note) => {
  const exp = await Expense.create(
    {
      userId, spentAt, title, amount, category, note,
    }
  );

  return exp;
};

const update = (id, title) => {
  return Expense.update({ title }, { where: { id } });
};

const remove = (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  filterByPeriod,
  filterByCategory,
  filterByUserId,
  getById,
  create,
  update,
  remove,
};
