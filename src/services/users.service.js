let Users = [];

function clearAllUsers() {
  Users = [];
}

function getAll() {
  return Users;
}

function getById(id) {
  return Users.find((user) => user.id === id);
}

function create(name) {
  const newUser = {
    id: Date.now(),
    name: name,
  };

  Users.push(newUser);

  return newUser;
}

function remove(id) {
  Users = Users.filter((user) => user.id !== id);
}

function update({ id, name }) {
  const user = getById(id);

  return Object.assign(user, { name });
}

const userService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  userService,
  clearAllUsers,
};
