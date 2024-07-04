const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');

const getAllExpences = () => Expense.findAll();

const getExpences = async ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.category = {
      [Op.in]: Array.isArray(categories) ? categories : [categories],
    };
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

  return Expense.findAll({
    where: whereClause,
  });
};

const getExpenceById = (id) => Expense.findByPk(id);

const createExpence = (data) => {
  const userExists = User.findByPk(data.userId);

  if (!userExists) {
    return null;
  }

  return Expense.create(data);
};

const deleteExpence = async (id) => {
  const expence = await Expense.findByPk(id);

  if (!expence) {
    return null;
  }

  return Expense.destroy({ where: { id } });
};

const patchExpence = async (id, data) => {
  const expence = Expense.findByPk(id);

  if (!expence) {
    return null;
  }

  await Expense.update(data, { where: { id } });

  return Expense.findByPk(id);
};

module.exports = {
  getExpences,
  getExpenceById,
  createExpence,
  getAllExpences,
  deleteExpence,
  patchExpence,
};
