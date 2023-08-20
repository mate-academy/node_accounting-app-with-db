import { Expense } from '../models/Expense.js';
import { Op } from 'sequelize';

async function getAll({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({ where });
}

async function getOne(ExpensesId) {
  return Expense.findByPk(ExpensesId, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  });
}

async function createOne(body) {
  const newExpense = await Expense.create({
    ...body,
    userId: Number(body.userId),
  });

  return {
    id: newExpense.id,
    title: newExpense.title,
    amount: newExpense.amount,
    category: newExpense.category,
    note: newExpense.note,
    spentAt: newExpense.spentAt,
  };
}

async function updateOne(ExpensesId, body) {
  const updatedExpense = await Expense.update(
    {
      ...body,
    },
    {
      where: { id: ExpensesId },
      returning: ['id', 'title', 'amount', 'category', 'note', 'spentAt'],
    },
  );

  return updatedExpense[1][0];
}

async function deleteOne(ExpenseId) {
  return Expense.destroy({
    where: { id: ExpenseId },
  });
}

export { getAll, getOne, createOne, updateOne, deleteOne };
