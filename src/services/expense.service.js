const { models } = require('../models/models');

const getAll = async (query = {}) => {
  const { userId, categories } = query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  const result = await models.Expense.findAll({ where });

  return result.map((exp) => exp.get({ plain: true }));
};

const getById = async (id) => {
  const expense = await models.Expense.findByPk(id);

  return expense ? expense.get({ plain: true }) : null;
};

const create = async ({
  title,
  amount,
  category,
  note = '',
  userId,
  spentAt,
}) => {
  const result = await models.Expense.create({
    userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount,
    category,
    note,
  });

  return result.get({ plain: true });
};

const update = async (id, updateData) => {
  // eslint-disable-next-line no-return-await
  await models.Expense.update(updateData, {
    where: {
      id,
    },
  });

  // eslint-disable-next-line no-return-await
  return await getById(id);
};

const remove = async (id) => {
  await models.Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
