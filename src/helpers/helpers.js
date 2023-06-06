'use strict';

const getNewId = (data) => {
  return Math.max(...data.map((item) => item.id), 0) + 1;
};

module.exports = { getNewId };
