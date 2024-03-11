'use strict';

const joi = require('joi');

const expensePostSchema = joi.object({
  userId: joi.number().integer().required(),
  spentAt: joi.string().isoDate().required(),
  title: joi.string().required(),
  amount: joi.number().integer().required(),
  category: joi.string(),
  note: joi.string(),
}).required();

const expensePatchSchema = joi.object({
  spentAt: joi.string().isoDate(),
  title: joi.string(),
  amount: joi.number().integer(),
  category: joi.string(),
  note: joi.string(),
}).required();

const expenseQuerySchema = joi.object({
  userId: joi.number().integer(),
  categories: joi.array().items(joi.string()).single(),
  from: joi.string().isoDate(),
  to: joi.string().isoDate(),
});

module.exports = {
  expensePostSchema,
  expensePatchSchema,
  expenseQuerySchema,
};
