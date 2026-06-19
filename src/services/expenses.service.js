const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { Category } = require('../models/Category.model');

async function getAll({ userId, categories, from, to }) {
  try {
    const whereConditions = {};

    if (userId) {
      whereConditions.userId = +userId;
    }

    if (categories && categories.length > 0) {
      whereConditions.category = { [Sequelize.Op.in]: categories };
    }

    if (from || to) {
      whereConditions.spentAt = {};

      if (from) {
        whereConditions.spentAt[Sequelize.Op.gte] = new Date(from);
      }

      if (to) {
        whereConditions.spentAt[Sequelize.Op.lte] = new Date(to);
      }
    }

    const expenses = await Expense.findAll({ where: whereConditions });

    return expenses;
  } catch (error) {
    throw new Error('Error fetching expenses');
  }
}

async function getById(id) {
  try {
    const expense = await Expense.findByPk(id);

    return expense;
  } catch {
    throw new Error('Error fetching expense');
  }
}

async function create({ userId, spentAt, title, amount, category, note }) {
  // Validate required fields
  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    throw new Error(
      'Missing required fields: userId, spentAt, title, amount, category',
    );
  }

  const expense = await Expense.create({
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  });

  return expense;
}

async function deleteById(id) {
  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return null;
    }

    await expense.destroy();

    return expense;
  } catch (error) {
    throw new Error('Error deleting expense');
  }
}

async function update({ id, spentAt, title, amount, category, note }) {
  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return null;
    }

    // Collect valid fields to update
    const updates = {};

    if (spentAt !== undefined) {
      updates.spentAt = spentAt;
    }

    if (title !== undefined) {
      updates.title = title;
    }

    if (amount !== undefined) {
      updates.amount = +amount;
    }

    if (category !== undefined) {
      updates.category = category;
    }

    if (note !== undefined) {
      updates.note = note;
    }

    // Require at least one valid field to update
    if (Object.keys(updates).length === 0) {
      throw new Error('No valid fields provided for update');
    }

    // If category is being updated, validate it exists
    if (updates.category !== undefined) {
      const foundCategory = await Category.findOne({
        where: { name: updates.category },
      });

      if (!foundCategory) {
        throw new Error('Category not found');
      }
      updates.category = foundCategory.name;
    }

    // Apply updates
    Object.assign(expense, updates);
    await expense.save();

    return expense;
  } catch (error) {
    throw new Error('Error updating expense');
  }
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
