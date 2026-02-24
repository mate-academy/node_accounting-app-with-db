const normalizeExpense = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category = {},
  note = null,
}) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category: category?.name || null,
  note,
});

module.exports = {
  normalizeExpense,
};
