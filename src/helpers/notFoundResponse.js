'use strict';

const notFoundResponse = (res, entity) => {
  return res
    .status(404)
    .json({
      error: `${entity} not found`,
    });
};

module.exports = { notFoundResponse };
