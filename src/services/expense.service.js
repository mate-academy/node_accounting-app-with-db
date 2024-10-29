const { Expense } = require('./../models/Expense.model');
const { Op } = require('sequelize');
const normalize = ({ amount, category, id, note, spentAt, title, userId }) => {
  return {
    amount,
    category,
    id,
    note,
    spentAt,
    title,
    userId,
  };
};

const getAll = async (filterParams = {}) => {
  const { categories, from, to, ...query } = filterParams;
  const where = { ...query };

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [new Date(from), new Date(to)] };
  } else if (from) {
    where.spentAt = { [Op.gte]: [from] };
  } else if (to) {
    where.spentAt = { [Op.lte]: [to] };
  }

  return Expense.findAll({ raw: true, where });
};

const getById = (id) => {
  return Expense.findByPk(id);
};
const create = (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = (id, param = {}) => {
  return Expense.update(param, { where: { id } });
};

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
