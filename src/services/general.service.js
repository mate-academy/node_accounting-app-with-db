const { tableMap } = require('../static/constants');

const get = async (entity, id = null) => {
  if (id === null) {
    return tableMap[entity].findAll();
  }

  return tableMap[entity].findByPk(id);
};

const patch = async (entity, id, body) => {
  const obj = await get(entity, id);

  if (obj === null) {
    return false;
  }

  await obj.update(body);

  return true;
};

module.exports = { get, patch };
