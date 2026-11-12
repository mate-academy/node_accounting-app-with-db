const { Op } = require('sequelize');
const { Expense } = require('../Expense.model');
const { User } = require('../User.model');

const normalizeExpense = ({
  id,
  title,
  amount,
  spentAt,
  category,
  note,
  userId,
}) => {
  return {
    id: +id,
    title,
    amount: +amount,
    spentAt,
    category,
    note,
    userId: +userId,
  };
};

const getAll = async (userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = +userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories.split(',').map((category) => category.trim()),
    };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  return Expense.findAll({ where });
};

const getById = async (id) => {
  const expensById = await Expense.findByPk(+id);

  return expensById;
};

const create = async (data) => {
  const { spentAt, title, amount, userId, category, note } = data;

  //  Перевірка обов'язкових полів
  if (!spentAt || !title || !amount || !userId) {
    throw new Error('Missing required fields');
  }

  // Перевірка існування користувача
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // 3. Створення витрати
  return Expense.create({
    spentAt,
    title,
    amount: +amount,
    userId: +userId,
    category,
    note,
  });
};

const upDate = async ({ id, spentAt, title, amount, category, note }) => {
  const updateData = {};

  if (spentAt !== undefined) {
    updateData.spentAt = spentAt;
  }

  if (title !== undefined) {
    updateData.title = title;
  }

  if (amount && !isNaN(amount)) {
    updateData.amount = +amount;
  }

  if (category !== undefined) {
    updateData.category = category;
  }

  if (note !== undefined) {
    updateData.note = note;
  }

  await Expense.update(updateData, { where: { id } });

  return Expense.findByPk(+id);
};

const deleteById = async (id) => {
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await Expense.destroy({ where: { id } });

  return expense;
};

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  normalizeExpense,
};
