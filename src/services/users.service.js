const { models } = require('../models/models');
const User = models.User;

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

module.exports = {
  getAll,
};
