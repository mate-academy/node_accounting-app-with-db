const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

module.exports = userSchema;
