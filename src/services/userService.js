'use strict';

const { User } = require('../models/User');

class UserService {
  getAll() {
    return User.findAll();
  }

  getUserById(userId) {
    return User.findByPk(Number(userId));
  }

  create(name) {
    const newUser = {
      name,
    };

    return User.create(newUser);
  }

  remove(userId) {
    return User.destroy({
      where: {
        id: Number(userId),
      },
    });
  }

  update({ id, name }) {
    return User.update({ name }, {
      where: { id },
    });
  }
}

module.exports = { UserService };
