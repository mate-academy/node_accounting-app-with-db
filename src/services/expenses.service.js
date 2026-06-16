const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getAll = async ({ userId, from, to, categories } = {}) => {
  const where = {};

  if (userId !== undefined) {
    where.userId = userId;
  }

  if (from !== undefined && to === undefined) {
    where.spentAt = {
      [Op.gte]: new Date(from),
    };
  } else if (from === undefined && to !== undefined) {
    where.spentAt = {
      [Op.lte]: new Date(to),
    };
  } else if (from !== undefined && to !== undefined) {
    where.spentAt = {
      [Op.gte]: new Date(from),
      [Op.lte]: new Date(to),
    };
  }

  if (Array.isArray(categories)) {
    where.category = {
      [Op.in]: categories,
    };
  } else if (typeof categories === 'string') {
    where.category = { [Op.in]: categories.split(',') };
  } else if (categories !== undefined) {
    where.category = categories;
  }

  const result = await Expense.findAll({
    where,
  });

  return result;
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: {
        id,
      },
    },
  );

  const updatedExpense = await Expense.findByPk(id);

  return updatedExpense;
};

const remove = async (id) => {
  const deleted = await Expense.destroy({
    where: {
      id,
    },
  });

  return deleted > 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

//   if (userId !== undefined) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) => expense.userId === Number(userId),
//     );
//   }

//   if (from !== undefined && to === undefined) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) => new Date(expense.spentAt) >= new Date(from),
//     );
//   } else if (from === undefined && to !== undefined) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) => new Date(expense.spentAt) <= new Date(to),
//     );
//   } else if (from !== undefined && to !== undefined) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) =>
//         new Date(expense.spentAt) >= new Date(from) &&
//         new Date(expense.spentAt) <= new Date(to),
//     );
//   }

//   if (Array.isArray(categories)) {
//     filteredExpenses = filteredExpenses.filter((expense) => {
//       return categories.includes(expense.category);
//     });
//   } else if (categories !== undefined) {
//     filteredExpenses = filteredExpenses.filter(
//       (expense) => expense.category === categories,
//     );
//   }

//   return filteredExpenses;
// };
