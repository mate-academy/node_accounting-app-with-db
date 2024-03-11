'use strict';

const AbstractRepository = require('./abstract.repository');
const { models: { User } } = require('../models/models');

class UserRepository extends AbstractRepository {

}

module.exports = new UserRepository(User);
