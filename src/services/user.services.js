const { User } = require('../models/User.model');

const getAll = () => {
  return User.findAll();
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  User.destroy({
    where: {
      id,
    },
  });
};

const update = async ({ id, name }) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return getUserById(id);
};

module.exports = {
  getAll,
  getUserById,
  create,
  remove,
  update,
};
