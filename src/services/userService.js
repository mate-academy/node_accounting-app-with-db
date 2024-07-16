const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const createUser = async (name) => {
  return User.create({ name });
};

const getUserById = async (userId) => {
  return User.findByPk(userId);
};

const deleteUserById = async (userId) => {
  const operationResult = await User.destroy({
    where: {
      id: userId,
    },
  });

  if (operationResult !== 1) {
    throw new Error('Todo not found');
  }
};

const UpdateUserData = async (userId, name) => {
  if (typeof userId !== 'number' || typeof name !== 'string') {
    throw new Error('Invalid user data');
  }

  const [affectedCount, updatedUsers] = await User.update(
    { name },
    {
      where: {
        id: userId,
      },
      returning: true,
    },
  );

  return [affectedCount, updatedUsers];
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  UpdateUserData,
};
