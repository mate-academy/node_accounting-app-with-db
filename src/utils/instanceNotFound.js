'use strict';

const instanceNotFound = (res, entity) => {
  return res
    .status(404)
    .json({
      error: `${entity} not found`,
    });
};

module.exports = { instanceNotFound };
