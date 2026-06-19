const { userDto } = require('./user.dto.js');

const usersDto = (users) => {
  return users.map(({ dataValues: user }) => userDto(user));
};

module.exports = {
  usersDto,
};
