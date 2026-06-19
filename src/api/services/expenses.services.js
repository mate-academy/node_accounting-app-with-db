const { Op } = require('sequelize');
const { models, sequelize } = require('../../models/models');
const { Expense } = models;

const getAll = async (filters) => {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.categories && filters.categories.length) {
    where.category = { [Op.in]: filters.categories };
  }

  if (filters.from || filters.to) {
    where.spentAt = {};

    if (filters.from) {
      where.spentAt[Op.gte] = new Date(filters.from);
    }

    if (filters.to) {
      where.spentAt[Op.lte] = new Date(filters.to);
    }
  }

  const expenses = await Expense.findAll({
    where,
    order: [['spentAt', 'ASC']],
  });

  return expenses;
};

const getExpense = (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const updateExpense = async ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenseToUpdate = await Expense.findByPk(id);

  if (!expenseToUpdate) {
    return;
  }

  const data = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const updatableParams = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  const updates = {};

  for (const elem of updatableParams) {
    if (!Object.prototype.hasOwnProperty.call(data, elem)) {
      continue;
    }

    const val = data[elem];

    if (val === undefined) {
      continue;
    }

    if (elem === 'userId' || elem === 'amount') {
      const num = Number(val);

      if (Number.isNaN(num)) {
        continue;
      }
      updates[elem] = num;
      continue;
    }

    if (elem === 'spentAt') {
      const t = Date.parse(val);

      if (isNaN(t)) {
        continue;
      }
      updates[elem] = val;
      continue;
    }
    updates[elem] = val;
  }

  return sequelize.transaction(async (t) => {
    const updated = await expenseToUpdate.update(updates, { transaction: t });

    return updated;
  });
};

const deleteExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

const expensesServices = {
  getAll,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = {
  expensesServices,
};
