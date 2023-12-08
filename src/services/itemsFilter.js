'use strict';

const itemsFilter = (items, params) => {
  const { userId, categories, from, to } = params;

  return items.filter(item => {
    const isUser = userId ? item.userId === +userId : true;

    const isCategories = categories ? categories.includes(item.category) : true;
    const isFrom = from ? item.spentAt > from : true;
    const isTo = to ? item.spentAt < to : true;

    return isUser && isCategories && isFrom && isTo;
  });
};

module.exports = { itemsFilter };
