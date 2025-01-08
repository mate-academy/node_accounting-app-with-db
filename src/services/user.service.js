let users = [];

function getRandomNumber() {
  const min = 0;
  const max = 1000000;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const start = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((person) => person.id === +id);
};

const create = (title) => {
  const person = { name: title, id: getRandomNumber() };

  users.push(person);

  return person;
};

const remove = (id) => {
  users = users.filter((person) => person.id !== +id);
};

const change = (id, title) => {
  const user = getById(id);

  if (user) {
    user.name = title;

    return user;
  }

  return null;
};

module.exports = {
  start,
  getAll,
  getById,
  create,
  remove,
  change,
};
