const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const categoryService = require('../services/categoryService');
const { Category } = require('../models/Category.model');

async function getExpenses({ userId, categories, from, to }) {
  const filter = {};

  if (userId) {
    filter.userId = +userId;
  }

  if (categories) {
    const categoryNames = Array.isArray(categories)
      ? categories
      : categories.split(',');

    const categoryRecords = await Category.findAll({
      where: {
        category: {
          [Op.in]: categoryNames,
        },
      },
    });

    const categoryIds = categoryRecords.map((c) => c.id);

    if (categoryIds.length === 0) {
      return [];
    }

    filter.categoryId = {
      [Op.in]: categoryIds,
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
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category'],
      },
    ],
  });
}

async function getExpenseById(id, includeCategory = false) {
  return Expense.findByPk(id, {
    include: includeCategory
      ? [{ model: Category, as: 'category', attributes: ['category'] }]
      : [],
  });
}

async function createExpense({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  let categoryId = null;

  if (category) {
    const categoryInstance =
      await categoryService.getOrCreateCategoryByName(category);

    categoryId = categoryInstance.id;
  }

  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });
}

async function updateExpense(id, newValues) {
  const expenseToUpdate = await getExpenseById(id);

  if (!expenseToUpdate) {
    return null;
  }

  const updateData = { ...newValues };

  if (newValues.category) {
    const categoryInstance = await categoryService.getOrCreateCategoryByName(
      newValues.category,
    );

    updateData.categoryId = categoryInstance.id;
    delete updateData.category;
  }

  const [updatedNumber] = await Expense.update(updateData, {
    where: { id },
  });

  return updatedNumber;
}

async function deleteExpense(id) {
  const deleted = await Expense.destroy({
    where: { id },
  });

  return deleted;
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
