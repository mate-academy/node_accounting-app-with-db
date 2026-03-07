const { Expense } = require('../models/Expense.model');
const { Category } = require('../models/Category.model');

const getAll = async (where = {}) => {
  return Expense.findAll({
    where,
    include: {
      model: Category,
      attributes: ['name'],
    },
  });
};

const getById = async (id) => {
  return Expense.findByPk(id, {
    include: {
      model: Category,
      attributes: ['name'],
    },
  });
};

const create = async ({ userId, spentAt, title, amount, categoryId, note }) => {
  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  return getById(expense.id);
};

const update = async ({ id, ...fields }) => {
  await Expense.update({ ...fields }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  Category: category,
  note,
}) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category: category ? category.name : null,
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
