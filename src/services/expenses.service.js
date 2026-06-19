const { Expense } = require("../models/Expense.model");
const { User } = require("../models/User.model");

const getAll = async ({ userId, categories, from, to }) => {
  const conditions = {};

  if (userId) {
    conditions.userId = userId;
  }

  if (categories) {
    conditions.category = categories;
  }

  if (from || to) {
    conditions.spentAt = {};
    if (from) {
      conditions.spentAt[Op.gte] = transformToDate(from); // "greater than or equal to"
    }
    if (to) {
      conditions.spentAt[Op.lte] = transformToDate(to); // "less than or equal to"
    }
  }

  try {
    const expenses = await Expense.findAll({
      where: conditions,
    });

    return expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

const add = async (data) => {
  const { userId, spentAt, title, amount, category, note } = data;

  if (
    userId < 0 ||
    isNaN(+userId) ||
    !spentAt ||
    !title ||
    amount < 0 ||
    isNaN(+amount) ||
    !category
  ) {
    return false;
  }

  const user = await User.findByPk(+userId);

  if (!user) {
    return false;
  }

  const newExpense = await Expense.create({ ...data });

  return newExpense;
}

const get = async (id) => {
  return await Expense.findByPk(+id);
};

const remove = async (id) => {
  const deletedNumber = await Expense.destroy({
    where: { id }
  });

  return deletedNumber;
}

const update = async (id, data) => {
  const [updatedRows] = await Expense.update({ ...data }, { where: { id } });

  if (updatedRows === 0) {
    return false;
  }

  const updatedExpense = await Expense.findByPk(id);
  return updatedExpense;
}


module.exports = {
  getAll,
  add,
  get,
  remove,
  update,
}