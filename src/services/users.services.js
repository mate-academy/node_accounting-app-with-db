const findUser = (users, id) => {
  return users.find((user) => user.id === +id);
};

const filterUsers = (users, id) => {
  const result = users.filter((user) => user.id !== +id);

  return result;
};

module.exports = {
  findUser,
  filterUsers,
};
