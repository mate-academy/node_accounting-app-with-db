let expenses = [];
let expId = 1;

const generateExpId = () => {
  const newId = expId;

  expId++;

  return newId;
};

export const getAll = () => {
  return expenses;
};

export const getFiltered = (userId, categories, fromDate, toDate) => {
  let filterData = [...expenses];

  if (userId) {
    filterData = filterData.filter(ex => ex.userId === Number(userId));
  }

  if (categories) {
    filterData = filterData.filter(ex => categories.includes(ex.category));
  }

  if (fromDate) {
    const dateFrom = new Date(fromDate);

    filterData = filterData.filter(ex => new Date(ex.spentAt) >= dateFrom);
  }

  if (toDate) {
    const dateTo = new Date(toDate);

    filterData = filterData.filter(ex => new Date(ex.spentAt) <= dateTo);
  }

  return filterData;
};

export const getById = (id) => {
  return expenses.find(ex => ex.id === Number(id)) || null;
};

export const create = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: generateExpId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

export const update = (id, updates) => {
  const expense = getById(id);

  Object.assign(expense, updates);

  return expense;
};

export const remove = (id) => {
  const newExpenses = expenses.filter(ex => ex.id !== id);

  expenses = newExpenses;
};

export const reset = () => {
  expenses = [];
};
