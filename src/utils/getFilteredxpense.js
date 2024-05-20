const { Sequelize } = require('sequelize');

const getFilteredExpenses = ({ userId, categories, from, to }) => {
  const filterParams = {
    ...(userId && { userId }),
    ...(categories && { category: categories }),
    ...((from || to) && {
      spentAt: {
        ...(from && { [Sequelize.Op.gte]: from }),
        ...(to && { [Sequelize.Op.lte]: to }),
      },
    }),
  };

  return filterParams;
};

module.exports = {
  getFilteredExpenses,
};
