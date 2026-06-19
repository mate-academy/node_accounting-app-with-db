const { models } = require('../models/models');

const getAll = async (query = {}) => {
  const { userId, categoryId, categories } = query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const result = await models.Expense.findAll({
    where,
    include: [
      {
        model: models.Category,
        as: 'category',
        attributes: ['id', 'name'],

        where: categories ? { name: categories } : undefined,
      },
    ],
  });

  return result.map((exp) => {
    const plainExp = exp.get({ plain: true });

    return {
      id: plainExp.id,
      title: plainExp.title,
      amount: plainExp.amount,
      spentAt: plainExp.spentAt,
      note: plainExp.note,
      userId: plainExp.userId,
      category: plainExp.category ? plainExp.category.name : null,
    };
  });
};

const getById = async (id) => {
  const expense = await models.Expense.findByPk(id, {
    include: [
      {
        model: models.Category,
        as: 'category',
        attributes: ['name'],
      },
    ],
  });

  if (!expense) {
    return null;
  }

  const plainExp = expense.get({ plain: true });

  return {
    id: plainExp.id,
    title: plainExp.title,
    amount: plainExp.amount,
    spentAt: plainExp.spentAt,
    note: plainExp.note,
    userId: plainExp.userId,
    category: plainExp.category ? plainExp.category.name : null,
  };
};

const create = async ({
  title,
  amount,
  categoryId,
  note = '',
  userId,
  spentAt,
}) => {
  const result = await models.Expense.create({
    userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount,
    categoryId,
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
