const { User } = require('../models/User.model');

const getAllUsers = async () => {
  return User.findAll();
};

const getUser = async (userId) => {
  return User.findByPk(userId);
};

const deleteUser = async (id) => {
  User.destroy({ where: { id } });
};

const createUser = async (name) => {
  const newUser = await User.create({
    name: name,
  });

  return { id: newUser.id, name: newUser.name };
};

const patchUser = async (userId, userName) => {
  await User.update(
    { name: userName },
    {
      where: {
        id: userId,
      },
    },
  );

  const user = getUser(userId);

  return user;
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  patchUser,
};
