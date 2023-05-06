'use strict';

const { User } = require('../models/users');

async function recreateTable() {
  await User.sync({ force: true });
}

module.exports = {
  recreateTable,
};
