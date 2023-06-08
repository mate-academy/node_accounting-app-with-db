'use strict';

const normalizeExpenses = ({
  id,
  userId,
  title,
  spentAt,
  amount,
  category,
  note,
}) => ({
  id, userId, title, spentAt, amount, category, note,
});

const normalizeUsers = ({ id, email }) => ({
  id,
  email,
});

module.exports = {
  normalizeExpenses,
  normalizeUsers,
};
