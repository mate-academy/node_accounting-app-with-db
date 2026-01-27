const { httpStatus, mthds } = require('../static/vocab');
const { bodySchemas, requiredFields } = require('./validationSchemas');
const { edgeCaseHandler } = require('./utils');
const { ValidationError, errorMsg } = require('../errors');

function validateBody(body, ent, method) {
  const schema = bodySchemas[ent][method];
  const scKeys = Object.keys(schema);
  const bKeys = Object.keys(body);

  // length check
  if (bKeys.length === 0) {
    throw new ValidationError(errorMsg.noBody, httpStatus.badRequest);
  }

  if (bKeys.length > scKeys.length) {
    throw new ValidationError(errorMsg.bodyStructure(), httpStatus.badRequest);
  }

  // check required fields for POST requests
  if (method === mthds.post) {
    const required = requiredFields[ent]?.[method] || [];
    const missingFields = required.filter((field) => !bKeys.includes(field));

    if (missingFields.length > 0) {
      throw new ValidationError(
        errorMsg.noObligateFields,
        httpStatus.badRequest,
      );
    }
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
