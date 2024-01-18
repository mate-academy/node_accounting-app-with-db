'use strict';

const { Expense } = require('../repository/db');
const { Op } = require('sequelize');

const findAll = async(filterProperties) => {
  const { userId, categories, from, to } = filterProperties;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    if (Array.isArray(categories) && categories.length > 0) {
      whereClause.category = {
        [Op.in]: categories,
      };
    } else {
      whereClause.category = categories;
    }
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  } else if (from) {
    whereClause.spentAt = {
      [Op.gte]: new Date(from),
    };
  } else if (to) {
    whereClause.spentAt = {
      [Op.lte]: new Date(to),
    };
  }

  return Expense.findAll({ where: whereClause });
};

const getById = async(id) => {
  return Expense.findByPk(+id);
};

const create = async(expense) => {
  try {
    const lastExpense = await Expense.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    const getMaxId = lastExpense ? lastExpense.id : 0;

    const newExpense = {
      id: getMaxId + 1,
      ...expense,
    };

    return Expense.create(newExpense);
  } catch (error) {
    throw error;
  }
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id: +id,
    },
  });
};

const update = async(id, newProperties) => {
  return Expense.update(newProperties, {
    where: {
      id,
    },
  });
};

const setAll = async(newExpenses) => {
  await Promise.all(newExpenses.map(async(newExpense) => {
    const existingUser = await Expense
      .findOne({ where: { id: newExpense.id } });

    if (existingUser) {
      await existingUser.update(newExpense);
    } else {
      await Expense.create(newExpense);
    }
  }));

  const allUsers = await Expense.findAll();

  return allUsers;
};

const clearExpenses = async() => {
  await Expense.destroy({
    where: {},
    truncate: true,
  });
};

module.exports = {
  findAll,
  getById,
  create,
  remove,
  update,
  setAll,
  clearExpenses,
};
