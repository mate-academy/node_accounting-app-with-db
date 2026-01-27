const { httpStatus } = require('../static/vocab');
const { bodySchemas } = require('./validationSchemas');
const { edgeCaseHandler } = require('./utils');
const { ValidationError, errorMsg } = require('../errors');

function validateBody(body, ent, method) {
  const schema = bodySchemas[ent][method];
  const scKeys = Object.keys(schema);
  const bKeys = Object.keys(body);

  // length check
  if (bKeys.length > scKeys.length) {
    throw new ValidationError(errorMsg.bodyStructure(), httpStatus.badRequest);
  }

  // key check
  const unknownKeys = [...bKeys].filter((el) => !scKeys.includes(el));

  if (unknownKeys.length > 0) {
    throw new ValidationError(
      errorMsg.keys(unknownKeys),
      httpStatus.badRequest,
    );
  }

  for (const key of bKeys) {
    // check data type
    if (typeof schema[key] !== typeof body[key]) {
      throw new ValidationError(
        errorMsg.valueType(body[key], schema[key]),
        httpStatus.badRequest,
      );
    }

    // validate edge cases (date in our case)\
    const edgeValidator = edgeCaseHandler[key];

    if (edgeValidator && !edgeValidator(body[key])) {
      throw new ValidationError(
        errorMsg.valueType(body[key], schema[key]),
        httpStatus.badRequest,
      );
    }
  }
}

module.exports = { validateBody };
