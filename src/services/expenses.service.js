const { Expense } = require('../models/Expense.model.js');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

async function getAll() {
  const result = await Expense.findAll();

  return result;
}

async function getOne(id) {
  return Expense.findByPk(id);
}

async function createOne({ userId, spentAt, title, amount, category, note }) {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

async function updateOne(
  id,
  { userId, spentAt, title, amount, category, note },
) {
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
  );

  return getOne(id);
}

async function deleteOne(id) {
  await Expense.destroy({ where: { id } });

  return true;
}

module.exports = {
  Expense,
  normalize,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
