const { Op } = require('sequelize');

const {
  models: { User, Expense, Category: CategoryModel },
} = require('../models/models');

const categoryService = require('./categoryService');

const getAll = async (params) => {
  if (!params) {
    return [];
  }

  const { userId, categories: cats, from, to } = params;

  const where = {};

  let categoriesByParams = [];

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

  let categoryNames = [];

  if (Array.isArray(cats)) {
    categoryNames = cats.filter(Boolean);
  } else if (typeof cats === 'string') {
    categoryNames = cats
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
  }

  if (categoryNames.length > 0) {
    categoriesByParams = await categoryService.getByName(categoryNames);

    if (categoriesByParams.length === 0) {
      return [];
    }

    const catsIds = categoriesByParams.map((cat) => cat.id);

    where.categoryId = {
      [Op.in]: catsIds,
    };
  }

  try {
    const data = await Expense.findAll({
      where,
      include: [
        {
          model: CategoryModel,
          attributes: ['id', 'name'],
        },
      ],
      order: [['spentAt', 'ASC']],
    });

    const formattedData = data.map((expense) => {
      const plain = expense.get({ plain: true });

      const { categoryId, Category, ...rest } = plain;

      return {
        ...rest,
        category: plain.Category?.name || null,
      };
    });

    return formattedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getById = async (id) => {
  const exById = await Expense.findByPk(id, {
    include: [
      {
        model: CategoryModel,
        attributes: ['id', 'name'],
      },
    ],
  });

  if (!exById) {
    return null;
  }

  const plain = exById.get({ plain: true });
  const { categoryId, Category, ...rest } = plain;

  return {
    ...rest,
    category: Category?.name || null,
  };
};

const create = async (content) => {
  const { userId, spentAt, title, amount, category, note } = content;

  const userbyId = await User.findByPk(userId);

  if (userbyId === null) {
    throw new Error('user not found');
  }

  let newCategory = null;

  if (category) {
    newCategory = await categoryService.create(category);
  }

  const newExpense = await Expense.create({
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    categoryId: newCategory ? newCategory.id : null,
    note: note,
  });

  const plain = newExpense.get({ plain: true });
  const { categoryId, ...rest } = plain;

  return {
    ...rest,
    category: newCategory ? newCategory.name : null,
  };
};

const update = async (expId, content) => {
  const exById = await Expense.findByPk(expId);

  if (exById === null) {
    return null;
  }

  const { spentAt, title, amount, category, note } = content;

  const updatePayload = {
    spentAt,
    title,
    amount,
    note,
  };

  if (category !== undefined) {
    const getCategory = await categoryService.create(category);

    updatePayload.categoryId = getCategory?.id ?? null;
  }

  await Expense.update(updatePayload, {
    where: {
      id: expId,
    },
  });

  const updated = await Expense.findByPk(expId, {
    include: [
      {
        model: CategoryModel,
        attributes: ['id', 'name'],
      },
    ],
  });

  if (!updated) {
    return null;
  }

  const plain = updated.get({ plain: true });
  const { categoryId, Category, ...rest } = plain;

  return {
    ...rest,
    category: Category?.name || null,
  };
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
