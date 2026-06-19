const { mthds } = require('../static/vocab');
const { ValidationError } = require('../errors');
const { serviceMap, dtoMap, statusCodeMap } = require('./maps');

const controllerRouter = async (entity, method, id = null, body = null) => {
  const action = serviceMap[entity]?.[method];

  if (!action) {
    throw new ValidationError('Unsupported method', 405);
  }

  const args = [id, body].filter((arg) => arg !== null);
  const result = await action(...args);

  let data = null;

  if (method !== mthds.delete) {
    const dto = dtoMap[entity];

    if (method === mthds.get) {
      data = id !== null ? dto.single(result) : dto.list(result);
    } else {
      data = dto.single(result);
    }
  }

  return {
    statusCode: statusCodeMap[method],
    data,
  };
};

module.exports = { controllerRouter };
