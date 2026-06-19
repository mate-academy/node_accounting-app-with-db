const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.category = { [Op.in]: categories.split(',') };
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
  return Expense.create({
    userId,
    spentAt,
    title,
    amount: parseFloat(amount),
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
