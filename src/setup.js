'use strict';

const { User } = require('./services/users.services');

User.sync({ force: true });
