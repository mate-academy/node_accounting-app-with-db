function getFilteredExpenses(expenses, value) {
  const filteredExpenses = expenses.filter((expense) => {
    if (value.categories) {
      return expense.category === value.categories;
    }

    if (value.userId) {
      return expense.userId === Number(value.userId);
    }

    if (value.from && value.to) {
      return (
        new Date(expense.spentAt) > new Date(value.from) &&
        new Date(expense.spentAt) < new Date(value.to)
      );
    }

    return true;
  });

  return filteredExpenses;
}

module.exports = {
  getFilteredExpenses,
};
