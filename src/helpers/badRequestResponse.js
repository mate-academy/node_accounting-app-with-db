'use strict';

const badRequestResponse = (res, field, type) => {
  return res
    .status(400)
    .json({
      error: `Please provide a valid '${field}' as a ${type}.`,
    });
};

module.exports = { badRequestResponse };
