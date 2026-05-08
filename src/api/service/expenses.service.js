const { Expense } = require('../../models/Expense.model');

async function getAll(where) {
  const expenses = await Expense.findAll({ where });

  return expenses;
}

function get(id) {
  return Expense.findByPk(id);
}

async function create(title, userId, spentAt, amount, category, note) {
  return Expense.create({
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  });
}

async function deleteById(id) {
  const deletedExpense = await Expense.destroy({ where: { id } });

  if (deletedExpense === 0) {
    return null;
  }

  return deletedExpense;
}

async function update({ id, title, amount, category, note, spentAt }) {
  const [count, users] = await Expense.update(
    {
      title,
      amount,
      category,
      note,
      spentAt,
    },
    {
      where: {
        id,
      },
      returning: true,
    },
  );

  if (count === 0) {
    return null;
  }

  return users[0];
}

module.exports.expensesService = {
  getAll,
  get,
  create,
  deleteById,
  update,
};
