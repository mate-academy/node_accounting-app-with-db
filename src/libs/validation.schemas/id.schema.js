'use strict';

const joi = require('joi');

const idSchema = joi.number().integer().positive();

module.exports = {
  idSchema,
};
