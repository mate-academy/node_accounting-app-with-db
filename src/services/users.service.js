const { models } = require('../models/models.js');

const getAll = async () => {
  const users = await models.User.findAll();

  return users;
};

const get = async (id) => {
  const user = await models.User.findByPk(id);

  return user;
};

const add = async (name) => {
  const user = await models.User.create({ name });

  return user;
};

const remove = async (id) => {
  const removed = await models.User.destroy({
    where: {
      id,
    },
  });

  return removed;
};

const update = async (id, body) => {
  await models.User.update(
    { name: body.name },
    {
      where: { id },
    },
  );

  const user = await models.User.findByPk(id);

  return user;
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
};
