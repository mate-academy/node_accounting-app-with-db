function sortByUserId(userId, currentExpenses) {
  if (userId) {
    return currentExpenses.filter((exp) => exp.userId === +userId);
  }

  return currentExpenses;
}

function sortByCategory(category, currentExpenses) {
  if (category) {
    return currentExpenses.filter((exp) => exp.category === category);
  }

  return currentExpenses;
}

function sortByFrom(from, currentExpenses) {
  if (from) {
    return currentExpenses.filter(
      (exp) => new Date(exp.spentAt) >= new Date(from),
    );
  }

  return currentExpenses;
}

function sortByTo(to, currentExpenses) {
  if (to) {
    return currentExpenses.filter(
      (exp) => new Date(exp.spentAt) <= new Date(to),
    );
  }

  return currentExpenses;
}

module.exports = {
  sortByCategory,
  sortByFrom,
  sortByTo,
  sortByUserId,
};
