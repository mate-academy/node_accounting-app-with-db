'use strict';

const { User } = require('../usersDb');

User.sync({ force: true });
