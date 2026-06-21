/* eslint-disable curly */
const { Op } = require('sequelize');
const { sequelize } = require('../db');
const { Expense } = require('../models/Expense.model');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

const getAll = async ({ userId, from, to, categories }) => {
  let filteredExpanses = await Expense.findAll();

  if (userId) {
    filteredExpanses = filteredExpanses.filter((ex) => ex.userId === userId);
  }

  if (categories) {
    filteredExpanses = filteredExpanses.filter(
      (ex) => ex.category === categories,
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpanses = filteredExpanses.filter(({ spentAt }) => {
      const expDate = new Date(spentAt);

      return expDate >= fromDate && expDate <= toDate;
    });
  }

  return filteredExpanses;
};

const getById = (id) => Expense.findByPk(id);

const create = async (body) => {
  const { userId, spentAt, title, amount, category, note } = body;

  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async (body) => {
  const { id, userId, spentAt, title, amount, category, note } = body;

  return Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );
};

const updateMany = async (expenses) => {
  return sequelize.transaction(async (t) => {
    for (const {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } of expenses) {
      await Expense.update(
        {
          userId,
          spentAt,
          title,
          amount,
          category,
          note,
        },
        { where: { id } },
        { transaction: t },
      );
    }
  });
};

const deleteById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const deleteMany = async (ids) => {
  await Expense.destroy({ where: { id: { [Op.in]: ids } } });
};

module.exports = {
  expensesService: {
    normalize,
    getAll,
    getById,
    create,
    deleteById,
    update,
    updateMany,
    deleteMany,
  },
};
