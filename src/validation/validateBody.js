const { getValError } = require('./utils');
const { bodySchemas, edgeCases } = require('../static/constants');

const edgeCaseHandler = {
  [edgeCases.date]: (received) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

    if (!isoDateRegex.test(received)) {
      return false;
    }

    const date = new Date(received);

    return !isNaN(date.getTime());
  },
};

function validateBody(body, ent, method) {
  const schema = bodySchemas[ent][method];
  const scKeys = Object.keys(schema);
  const bKeys = Object.keys(body);

  // length check
  if (bKeys.length > scKeys.length) {
    return getValError(400, 'Invalid body structure');
  }

  // key check
  if (!bKeys.every((el) => scKeys.includes(el))) {
    return getValError(400, 'Unexpected keys in body');
  }

  for (const key of bKeys) {
    // check data type
    if (typeof schema[key] !== typeof body[key]) {
      return getValError(400, `Unexpected keys: ${key}; ${typeof body[key]}`);
    }

    // validate edge cases (date in our case)\
    const edgeValidator = edgeCaseHandler[key];

    if (edgeValidator && !edgeValidator(body[key])) {
      return getValError(400, `Invalid value for field: ${key}`);
    }
  }

  return { ok: true, body: body };
}

module.exports = { validateBody };
