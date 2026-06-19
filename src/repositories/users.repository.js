const {
  models: { User },
} = require('../models/models');

const createUserDB = async (userName) => {
  const newUser = await User.create({ name: userName });

  return newUser;
};

const getAllUsersDB = async () => {
  const users = await User.findAll();

  return users;
};

const getUserByIdDB = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  return user;
};

const updateUserDB = async (updateUserData) => {
  const [affectedrows, updatedData] = await User.update(updateUserData, {
    where: {
      id: updateUserData.id,
    },
    returning: true,
  });

  return affectedrows ? updatedData[0] : null;
};

const deleteUserDB = async (userId) => {
  const affectedrows = await User.destroy({
    where: {
      id: userId,
    },
  });

  return affectedrows;
};

const usersRepository = {
  getAllUsersDB,
  getUserByIdDB,
  createUserDB,
  updateUserDB,
  deleteUserDB,
};

module.exports = usersRepository;
