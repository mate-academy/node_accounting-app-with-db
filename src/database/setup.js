'use strict';

const User = require('../models/User');

const setupDatabase = async() => {
  await User.sync({ force: true });
};

module.exports = { setupDatabase };
