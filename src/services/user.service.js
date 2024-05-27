const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const userID = await User.findByPk(id);

  return userID;
};

const create = async (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
