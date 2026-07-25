const { Expense } = require('../models/Expense.model');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getAll = () => {
  return Expense.findAll({ order: [['id', 'ASC']] });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async ({ id, spentAt, title, amount, category, note }) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return getById(id);
};

const remove = (id) => {
  return Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  createExpense,
  update,
  remove,
  normalize,
};
