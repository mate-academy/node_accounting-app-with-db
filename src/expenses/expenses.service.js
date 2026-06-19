const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function getAll({ userId: queryUserId, categories, to, from }) {
  const filter = {};

  if (queryUserId) {
    filter.userId = queryUserId;
  }

  if (categories) {
    const categoriesArray =
      typeof categories === 'string' ? categories.split(',') : categories || [];

    filter.category = {
      [Op.in]: categoriesArray,
    };
  }

  if (from || to) {
    filter.spentAt = {};

    if (from) {
      filter.spentAt[Op.gte] = from;
    }

    if (to) {
      filter.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({
    where: filter,
  });
}

function getById(id) {
  return Expense.findByPk(id);
}

async function deleteById(id) {
  const deleted = await Expense.destroy({
    where: {
      id,
    },
  });

  return deleted;
}

function create({ userId, spentAt, title, amount, category, note }) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function update(id, newValues) {
  const expenseToUpdate = await getById(id);

  if (!expenseToUpdate) {
    return;
  }

  const updatedNumber = await Expense.update(
    { ...newValues },
    {
      where: {
        id,
      },
    },
  );

  return updatedNumber[0];
}

module.exports = {
  getAll,
  getById,
  deleteById,
  create,
  update,
};
