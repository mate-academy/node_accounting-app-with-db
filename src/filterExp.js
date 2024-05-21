const isExpenseMatch = (expense, id, categories, fromDate, toDate) => {
  const { userId, category, spentAt } = expense;

  if (id && userId !== id) {
    return false;
  }

  if (categories && !categories.includes(category)) {
    return false;
  }

  if (spentAt < fromDate || spentAt > toDate) {
    return false;
  }

  return true;
};

module.exports = { isExpenseMatch };
