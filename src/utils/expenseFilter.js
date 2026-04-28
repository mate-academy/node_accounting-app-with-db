const { Op } = require('sequelize');

const expenseFilter = ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    const cats = categories.split(',');

    where.category = { [Op.in]: cats };
  }

  if (from || to) {
    where.spentAt = {};
  }

  if (from) {
    where.spentAt[Op.gte] = new Date(from);
  }

  if (to) {
    where.spentAt[Op.lte] = new Date(to);
  }

  return where;
};

module.exports = { expenseFilter };
