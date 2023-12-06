import { Op } from "sequelize";

export const defineFilterQuery = (userId, category, from, to) => {
  const filterParams = {};

  if (userId) {
    filterParams.userId = userId;
  }

  if (category) {
    filterParams.category = category instanceof Array
      ? { [Op.in]: category }
      : { [Op.in]: [category] };
  }

  if (from) {
    filterParams.spentAt = { [Op.gte]: from };
  }

  if (to) {
    filterParams.spentAt = { [Op.lte]: to };
  }

  return filterParams;
};
