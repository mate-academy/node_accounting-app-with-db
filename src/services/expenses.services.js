const { Expense } = require('../models/Expense.model');
const { getFilteredExpenses } = require('../utils/getFilteredxpense');

const get = async (query) => {
  const filteredExpenses = getFilteredExpenses(query);

  return Expense.findAll({
    where: filteredExpenses,
  });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const add = async (data) => {
  return Expense.create(data);
};

const remove = async (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, data) => {
  await Expense.update(
    { ...data },
    {
      where: {
        id,
      },
    },
  );

  return Expense.findByPk(id);
};

module.exports = {
  get,
  add,
  getById,
  remove,
  update,
};
