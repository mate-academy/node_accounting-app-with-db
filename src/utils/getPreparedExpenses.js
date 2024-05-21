const getPreparedExpenses = (query, expenses) => {
  if (!query) {
    return expenses;
  }

  const { userId, categories, from, to } = query;
  let preparedExpenses = [...expenses];

  if (userId) {
    preparedExpenses = expenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    preparedExpenses = expenses.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from && to) {
    const startDate = new Date(from);
    const endDate = new Date(to);

    preparedExpenses = expenses.filter((expense) => {
      const currentDate = new Date(expense.spentAt);

      return currentDate >= startDate && currentDate <= endDate;
    });
  }

  return preparedExpenses;
};

module.exports = {
  getPreparedExpenses,
};
