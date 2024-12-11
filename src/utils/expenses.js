const isExpenseValid = (expense) => {
  const { title, amount, category, spentAt } = expense;

  return !!(
    typeof title === 'string' &&
    typeof amount === 'number' &&
    typeof category === 'string' &&
    typeof spentAt === 'string'
  );
};

const getNewExpenseData = (expense, id) => {
  const { title, amount, category, userId, note } = expense;

  const newExpense = {
    id,
    title,
    amount,
    category,
    userId,
  };

  return note ? { ...newExpense, note } : newExpense;
};

module.exports = {
  isExpenseValid,
  getNewExpenseData,
};
