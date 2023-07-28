'use strict';

function filterExpenses(expenses, {
  userId,
  categories,
  from,
  to,
}) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === Number(userId)
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category))
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate;
    }
    );
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt <= toDate;
    });
  }

  return filteredExpenses;
}

const normalizeUser = ({ id, name }) => ({
  id, name,
});

const normalizeExpense = ({
  id,
  userId,
  title,
  amount,
  category,
  note,
}) => ({
  id,
  userId,
  title,
  amount,
  category,
  note,
});

module.exports = {
  normalizeExpense,
  normalizeUser,
  filterExpenses,
};
