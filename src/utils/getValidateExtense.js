const validateExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  if (
    !userId ||
    typeof spentAt !== 'string' ||
    !title ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    (category && typeof category !== 'string') ||
    (note && typeof note !== 'string')
  ) {
    return false;
  }

  return true;
};

module.exports = validateExpense;
