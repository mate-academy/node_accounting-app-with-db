'use strict';

const itemsFilter = (items, params) => {
  const { userId, categories, from, to } = params;

  let copy = [...items];

  if (userId) {
    copy = copy.filter(item => item.userId === +userId);
  }

  if (categories) {
    copy = copy.filter(item => categories.includes(item.category));
  }

  if (from || to) {
    copy = copy.filter(item => item.spentAt > from && item.spentAt < to);
  }

  return copy;
};

module.exports = { itemsFilter };
