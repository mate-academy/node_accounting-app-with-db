const users = [];

const getById = (id) => {
  return users.find((user) => user.id === Number(id));
};

const getAll = () => {
  return users;
};

const deleteById = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));

  if (index !== -1) {
    users.splice(index, 1);
  }
};

const create = ({ name }) => {
  const newId = Date.now();

  users.push({
    id: newId,
    name,
  });

  return getById(newId);
};

const update = ({ id, name }) => {
  users.forEach((user) => {
    if (user.id === id) {
      user.name = name;
    }
  });

  return getById(id);
};

module.exports = {
  getById,
  getAll,
  deleteById,
  create,
  update,
};
