const { Op } = require('sequelize');

const findItemById = (arr, id) =>
  arr.find((item) => String(item.id) === String(id));

const getId = (arr) => {
  return arr.reduce((init, { id }) => {
    if (init <= id) {
      return id + 1;
    }

    return init;
  }, 1);
};

const getFilteredArrayById = (arr, id) => {
  if (!id) {
    return arr;
  }

  return [...arr].filter((item) => Number(item.id) !== Number(id));
};

function getWhereOptions(query) {
  const { userId, categories, from, to } = query;
  let countOfQueries = 0;

  const whereOptions = {
    where: {
      [Op.and]: [],
    },
  };

  if (userId) {
    whereOptions.where[Op.and].push({ userId: { [Op.eq]: userId } });
    countOfQueries++;
  }

  if (categories) {
    if (categories instanceof Array) {
      whereOptions.where[Op.and].push({ category: { [Op.in]: categories } });
    } else {
      whereOptions.where[Op.and].push({ category: { [Op.eq]: categories } });
    }
    countOfQueries++;
  }

  if (from) {
    whereOptions.where[Op.and].push({ spentAt: { [Op.gte]: from } });
    countOfQueries++;
  }

  if (to) {
    whereOptions.where[Op.and].push({ spentAt: { [Op.lte]: to } });
    countOfQueries++;
  }

  return countOfQueries ? whereOptions : {};
}

module.exports = {
  findItemById,
  getId,
  getFilteredArrayById,
  getWhereOptions,
};
