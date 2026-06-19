const { tableMap } = require('../static/constants');
const { NotFoundError } = require('../errors');

const get = async (entity, id = null) => {
  if (id === null) {
    return tableMap[entity].findAll();
  }

  return tableMap[entity].findByPk(id);
};

const patch = async (entity, id, body) => {
  const obj = await get(entity, id);

  if (obj === null) {
    throw new NotFoundError(entity, id);
  }

  const newObj = await obj.update(body);

  return newObj;
};

module.exports = { get, patch };
