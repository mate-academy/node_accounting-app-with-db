const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories && typeof categories === 'string') {
    const categoryList = categories
      .split(',')
      .map((category) => category.trim()) // Trim whitespace
      .filter((category) => category.length > 0); // Remove empty values

    if (categoryList.length > 0) {
      whereClause.category = { [Op.in]: categoryList };
    }
  }

  if (from) {
    whereClause.spentAt = { ...whereClause.spentAt, [Op.gte]: new Date(from) };
  }

  if (to) {
    whereClause.spentAt = { ...whereClause.spentAt, [Op.lte]: new Date(to) };
  }

  return Expense.findAll({ where: whereClause });
};

const getById = (id) => Expense.findByPk(id);

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Amount must be a valid positive number');
  }

  return Expense.create({
    userId,
    spentAt,
    title,
    amount: parsedAmount,
    category,
    note,
  });
};

const remove = async (id) => {
  const deletedCount = await Expense.destroy({
    where: { id },
  });

  return deletedCount > 0;
};

const update = async (id, data) => {
  const [updatedCount, updatedExpenses] = await Expense.update(data, {
    where: { id },
    returning: true,
  });

  if (updatedCount === 0) {
    return null;
  }

  return updatedExpenses[0];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
