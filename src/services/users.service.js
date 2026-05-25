const { models } = require('../models/models.js');

const getAll = () => {
  return models.User.findAll();
};

const get = (id) => {
  return models.User.findByPk(id);
};

const add = (name) => {
  return models.User.create({ name });
};

const remove = (id) => {
  return models.User.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, body) => {
  await models.User.update({ name: body.name }, { where: { id } });

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
