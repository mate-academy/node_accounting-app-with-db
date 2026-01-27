const { validateRequest } = require('./validateRequest');
const { validateBody } = require('./validateBody');
const { bodySchemas } = require('./validationSchemas');
const { readBody } = require('../helpers/helpers');

async function validate(req) {
  const parsedRequest = validateRequest(req);

  const { method, ent, id } = parsedRequest;
  let body = null;

  if (bodySchemas[ent][method]) {
    body = await readBody(req);

    validateBody(body, ent, method);
  }

  return {
    ent,
    method,
    id,
    body,
  };
}

module.exports = { validate };
