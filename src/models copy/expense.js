const expenses = [];

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id));
};

const getAll = () => {
  return expenses;
};

const deleteById = (id) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index !== -1) {
    expenses.splice(index, 1);
  }
};

const create = (expense) => {
  const newId = Date.now();

  expenses.push({
    id: newId,
    ...expense,
  });

  return getById(newId);
};

const update = ({ id, userId, spentAt, title, amount, category, note }) => {
  expenses.forEach((expense) => {
    if (expense.id === id) {
      expense.userId = userId;
      expense.spentAt = spentAt;
      expense.title = title;
      expense.amount = amount;
      expense.category = category;
      expense.note = note;
    }
  });

  return getById(id);
};

module.exports = {
  getById,
  getAll,
  deleteById,
  create,
  update,
};
