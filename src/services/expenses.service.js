const { Expense } = require('../models/Expense.model');

const getAll = async (where = {}) => {
  return Expense.findAll({ where });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async ({ id, ...fields }) => {
  await Expense.update({ ...fields }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
