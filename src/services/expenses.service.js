const { Expense } = require('../models/Expense.model');
const { customAlphabet } = require('nanoid');

const generateNumericId = customAlphabet('1234567890', 9);

const getAll = async () => {
  const result = await Expense.findAll();

  return result;
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async (userId, spentAt, title, amount, category, note) => {
  let id;

  do {
    id = Number(generateNumericId());
  } while (await Expense.findByPk(id));

  const expense = await Expense.create({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
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
    { where: { id } },
  );
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
