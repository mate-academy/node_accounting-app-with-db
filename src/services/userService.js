let users = [];

const getAllUsers = () => users;

const createUser = (name) => {
  const newId = getHighestId(users) + 1;

  const newUser = { id: newId, name };

  users.push(newUser);

  return newUser;
};

const getUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

const deleteUserById = (userId) => {
  const searchedUserIndex = users.findIndex((user) => user.id === userId);

  users.splice(searchedUserIndex, 1);
};

const UpdateUserData = (searchedUser, name) => {
  Object.assign(searchedUser, { name });
};

function resetUsers() {
  users = [];
}

function getHighestId(array) {
  return array.reduce(
    (acc, currentObject) => (currentObject.id > acc ? currentObject.id : acc),
    array[0]?.id || -1,
  );
}

module.exports = {
  resetUsers,
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  UpdateUserData,
};
