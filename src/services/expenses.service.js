const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (query = null) => {
  const whereConditions = {};

  Object.entries(query).forEach(([key, value]) => {
    if (
      key !== 'from' &&
      key !== 'to' &&
      key !== 'categories' &&
      value !== null &&
      value !== undefined
    ) {
      whereConditions[key] = value;
    }

    if (key === 'categories') {
      whereConditions.category = value;
    }
  });

  if (query.from && query.to) {
    whereConditions.spentAt = {
      [Op.gte]: new Date(query.from),
      [Op.lte]: new Date(query.to),
    };
  } else if (query.from) {
    whereConditions.spentAt = {
      [Op.gte]: new Date(query.from),
    };
  } else if (query.to) {
    whereConditions.spentAt = {
      [Op.lte]: new Date(query.to),
    };
  }

  const expenses = await Expense.findAll({
    where: whereConditions,
  });

  return expenses;
};

const getOneById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async ({
  userId,
  spentAt,
  title,
  amount,
  category = '-',
  note = '-',
}) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (id, { title, spentAt, amount, category, note }) => {
  if (!getOneById(id)) {
    return null;
  }

  await Expense.update(
    {
      title,
      spentAt,
      amount,
      category,
      note,
    },
    { where: { id: id } },
  );

  const updatedExpense = await getOneById(id);

  return updatedExpense;
};

module.exports = {
  getAll,
  getOneById,
  create,
  remove,
  update,
};
