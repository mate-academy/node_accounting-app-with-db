const userDto = ({ id, name }) => {
  return {
    id: +id,
    name,
  };
};

module.exports = {
  userDto,
};
