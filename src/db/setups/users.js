'use strict';

const Users = require('../models/users');

Users.sync({ force: true });
