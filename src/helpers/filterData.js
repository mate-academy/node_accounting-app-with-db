export const getFiltered = (expenses, userId, categories, fromDate, toDate) => {
  let filterData = [...expenses];

  if (userId) {
    filterData = filterData.filter(ex => ex.userId === userId);
  }

  if (categories) {
    filterData = filterData.filter(ex => categories.includes(ex.category));
  }

  if (fromDate) {
    const dateFrom = new Date(fromDate);

    filterData = filterData.filter(ex => new Date(ex.spentAt) >= dateFrom);
  }

  if (toDate) {
    const dateTo = new Date(toDate);

    filterData = filterData.filter(ex => new Date(ex.spentAt) <= dateTo);
  }

  return filterData;
};
