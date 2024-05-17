'use strict';

function normalizeData(data) {
  const copyData = { ...data };
  delete copyData.createdAt;
  delete copyData.updatedAt;

  return copyData;
};

module.exports = {
  normalizeData,
};
