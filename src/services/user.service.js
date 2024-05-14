const { User } = require('../models/User.model.js');

const create = async (name) => {
  return User.create({
    name,
  });
};

const getUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const remove = (id) => {
  return User.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  getUsers,
  getUserById,
  update,
  remove,
};
