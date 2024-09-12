const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = (params) => {
  const { userId, categoryId, from, to } = params;

  const whereCondition = {};

  if (categoryId) {
    whereCondition.categoryId = categoryId;
  }

  if (userId) {
    whereCondition.userId = userId;
  }

  if (from && to) {
    whereCondition.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({
    where: whereCondition,
  });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = ({ userId, spentAt, title, amount, categoryId, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });
};

const update = (id, { spentAt, title, amount, categoryId, note }) => {
  return Expense.update(
    {
      spentAt,
      title,
      amount,
      categoryId,
      note,
    },
    { where: { id } },
  );
};

const remove = (id) => {
  return Expense.destroy({ where: { id } });
};

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  categoryId,
  note,
}) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
