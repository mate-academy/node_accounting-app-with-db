const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll({
    attributes: ['id', 'name'],
    order: ['id'],
  });

  return result;
};

const getById = (id) => {
  return User.findByPk(id, {
    attributes: ['id', 'name'],
  });
};

const add = (user) => {
  return User.create(user);
};

const remove = async (id) => {
  await User.destroy({
    where: { id },
  });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const result = await User.findByPk(id, { attributes: ['id', 'name'] });

  return result;
};

const userService = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  userService,
};
