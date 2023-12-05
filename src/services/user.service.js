let users = [];
let usersId = 1;

const generateUserId = () => {
  const newId = usersId;

  usersId++;

  return newId;
};

export const getAll = () => {
  return users;
};

export const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

export const create = (name) => {
  const user = {
    id: generateUserId(),
    name,
  };

  users.push(user);

  return user;
};

export const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

export const remove = (id) => {
  const newUsers = users.filter(user => user.id !== id);

  users = newUsers;
};

export const reset = () => {
  users = [];
};
