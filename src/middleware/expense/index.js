const { validateCreateBody } = require('./validateCreateBody');
const { validateGetAllQuery } = require('./validateGetAllQuery');
const { validateUpdateBody } = require('./validateUpdateBody');

module.exports = {
  validateGetAllQuery,
  validateCreateBody,
  validateUpdateBody,
};
