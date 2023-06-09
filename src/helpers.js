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

const normalizeCategories = ({ id, name }) => ({
  id,
  name,
});

module.exports = {
  normalizeExpenses,
  normalizeUsers,
  normalizeCategories,
};
