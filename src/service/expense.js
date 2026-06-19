const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = +userId;
  }

  if (categories && categories.length > 0) {
    whereClause.category = Array.isArray(categories)
      ? { [Op.in]: categories }
      : { [Op.eq]: categories };
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({
    where: whereClause,
  });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (fields) => {
  // await sequelize.sync();

  return Expense.create(fields);
};

const remove = (id) => {
  return Expense.destroy({ where: { id } });
};

const update = (id, dataToUpdate) => {
  return Expense.update(dataToUpdate, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
