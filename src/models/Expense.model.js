'use strict';

const { sequelize } = require('../db.js');
const usersService = require('../services/user');
const { Op, DataTypes } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'expense',
  },
);

const init = async () => {
  Expense.sync({ force: true });
};

const getAll = async (userId, categories, from, to) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (categories) {
    filter.category = categories;
  }

  if (from && !to) {
    filter.spentAt = { [Op.gte]: from };
  }

  return Expense.findAll({
    where: filter,
  });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (data) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = usersService.getById(data.userId);

      if (!user) {
        return null;
      }

      return Expense.create(data);
    });

    return result;
  } catch {
    return 'error';
  }
};

const update = async (id, body) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const expense = usersService.getById(id);

      if (!expense) {
        return null;
      }

      return Expense.update(body, { where: { id } });
    });

    return result;
  } catch {
    return 'error';
  }
};

const remove = (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  Expense,
  getAll,
  getById,
  create,
  update,
  remove,
  init,
};
