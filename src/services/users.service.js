let users = [];
const clearUsersForTest = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const createUser = (name) => {
  const newUser = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  clearUsersForTest,
};
