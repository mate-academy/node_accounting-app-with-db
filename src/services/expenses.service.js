const { models } = require('../models/models.js');

const getAll = async () => {
  const expenses = await models.Expense.findAll();

  return expenses;
};

const get = async (queryFilter, value) => {
  const filtered = await models.Expense.findAll({
    where: {
      [queryFilter]: value,
    },
  });

  return filtered;
};

const add = async (body) => {
  const expense = await models.Expense.create({ ...body });

  return expense;
};

const remove = async (id) => {
  const deleted = await models.Expense.destroy({
    where: { id },
  });

  return deleted;
};

const update = async (id, body) => {
  await models.Expense.update(
    { ...body },
    {
      where: { id },
    },
  );

  return models.Expense.findByPk(id);
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
