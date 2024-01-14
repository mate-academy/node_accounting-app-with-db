import { Op } from 'sequelize';
import { Expense } from '../../db/models/expenses.js';

const getAll = async({ userId, categories, from, to } = {}) => {
  const where = {
    spentAt: {},
  };

  if (userId) {
    where.userId = userId;
  }

  if (from) {
    where.spentAt[Op.gte] = new Date(from);
  }

  if (to) {
    where.spentAt[Op.lte] = new Date(to);
  }

  if (categories.length) {
    where.category = {
      [Op.in]: categories,
    };
  }

  const expenses = await Expense.findAll({
    where,
  });

  return expenses;
};

const getOne = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async(data) => {
  const newExpense = await Expense.create(data);

  return newExpense;
};

const remove = async(id) => {
  await Expense.destroy({
    where: { id },
  });
};

const update = async({
  id,
  ...values
}) => {
  const updatedExpense = await Expense.update(values, {
    where: { id },
  });

  return updatedExpense;
};

export {
  getAll,
  getOne,
  create,
  remove,
  update,
};
