const normalizeUser = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const normalizeExpense = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const normalizeCategory = ({ id, name }) => {
  return {
    id,
    name,
  };
};

module.exports = {
  normalizeUser,
  normalizeExpense,
  normalizeCategory,
};
