'use strict';

const joi = require('joi');

const userReqSchema = joi.object({
  name: joi.string().required(),
}).required();

module.exports = { userReqSchema };
