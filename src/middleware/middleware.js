'use strict';

const { getById } = require('../services/users.service');

const isValidDate = (data) => {
  const { userId, spentAt, title, amount, category, note } = data;
  const user = getById(userId);

  return (
    !user || !spentAt || !title || !amount || !category || !note || !userId
  );
};

module.exports = {
  isValidDate,
};
