const usersData = require('../resources/usersData');
const { users, userCount } = usersData;

const getAllUsers = async () => {
  return users;
};

const getOneUser = async (id) => {
  return users.find((u) => u.id === id) || null;
};

const createUser = async (userData) => {
  const newUser = {
    id: userCount(),
    ...userData,
  };

  users.push(newUser);
  usersData.incrementCount();

  return newUser;
};

const updateUser = async (id, paramsToUpdate) => {
  const userToUpdate = users.find((u) => u.id === id);

  if (!userToUpdate) {
    return null;
  }

  Object.assign(userToUpdate, paramsToUpdate);

  return userToUpdate;
};

const deleteUser = async (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  const deletedUser = users.splice(index, 1);

  return deletedUser[0];
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
