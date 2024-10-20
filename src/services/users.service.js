const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async ({ name }) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  const [affectedRows] = await User.update({ name }, { where: { id } });

  if (affectedRows === 0) {
    return null;
  }

  return User.findByPk(id);
};

const destroyUser = async ({ id }) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  destroyUser,
};
