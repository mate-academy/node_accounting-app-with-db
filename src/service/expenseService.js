const { Op } = require('sequelize');
const {
  models: { Expense },
} = require('../models/models');

const {
  models: { User },
} = require('../models/models');

const getAll = async (params) => {
  const emptyResult = [];

  if (!params) {
    return emptyResult;
  }

  const { userId, categories: cats, from, to } = params;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  const spentAt = {};

  if (isValidDate(fromDate)) {
    spentAt[Op.gte] = fromDate;
  }

  if (isValidDate(toDate)) {
    spentAt[Op.lte] = toDate;
  }

  if (Object.keys(spentAt).length > 0) {
    where.spentAt = spentAt;
  }

  let normalCats = cats;

  if (!Array.isArray(cats)) {
    if (typeof cats === 'string') {
      normalCats = cats
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
    } else {
      normalCats = [];
    }
  }

  if (normalCats.length > 0) {
    where.category = {
      [Op.in]: normalCats,
    };
  }

  try {
    const data = await Expense.findAll({ where });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  const exById = await Expense.findByPk(id);

  return exById;
};

const create = async (content) => {
  const { userId, spentAt, title, amount, category, note } = content;

  const userbyId = await User.findByPk(userId);

  if (userbyId === null) {
    throw new Error('user not found');
  }

  const newEx = await Expense.create({
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category ?? null,
    note: note,
  });

  return newEx;
};

const update = async (expId, content) => {
  const exById = await Expense.findByPk(expId);

  if (exById === null) {
    return null;
  }

  const { spentAt, title, amount, category, note } = content;

  const [updated] = await Expense.update(
    {
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    },
    {
      where: {
        id: expId,
      },
    },
  );

  return updated;
};

const remove = async (id) => {
  const deletedCount = await Expense.destroy({
    where: {
      id: id,
    },
  });

  return deletedCount;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
