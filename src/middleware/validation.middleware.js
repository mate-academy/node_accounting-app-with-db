'use strict';

const { idSchema } = require('../libs/validation.schemas/id.schema');

const paramsTypes = {
  id: 'id',
  body: 'body',
  query: 'query',
};

const getRequestDataWith = (paramsType, req) => {
  return paramsType === paramsTypes.id
    ? req.params.id
    : req[paramsType];
};

const validateRequest = (
  schema = idSchema,
  paramsType = paramsTypes.id
) => (req, res, next) => {
  const reqData = getRequestDataWith(paramsType, req);

  const { error } = schema.validate(reqData);

  if (error) {
    res.status(400).send({ error: `Bad request! ${error.message}` });

    return;
  }

  next();
};

const idValidation = validateRequest();
const bodyValidation = (schema) => validateRequest(schema, paramsTypes.body);
const queryValidation = (schema) => validateRequest(schema, paramsTypes.query);

module.exports = {
  idValidation,
  bodyValidation,
  queryValidation,
};
