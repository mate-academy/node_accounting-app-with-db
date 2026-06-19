const { Expense } = require('../models/Expense.model');

const get = async () => {
  return Expense.findAll();
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

const getById = async (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

const update = async ({ id, spentAt, title, amount, category, note }) => {
  return Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
