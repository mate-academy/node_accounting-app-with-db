const userDTO = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
  };
};

const userListDTO = (users) => {
  if (!Array.isArray(users)) {
    return [];
  }

  return users.map(userDTO);
};

module.exports = { userDTO, userListDTO };
