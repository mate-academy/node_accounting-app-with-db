const { Expense } = require('./../models/Expense.model');
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
  const expenses = await Expense.findAll({ where: filterParams });

  return expenses;
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
