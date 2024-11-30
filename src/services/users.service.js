const { User } = require('../models/models').models;

class UsersService {
  getAll() {
    return User.findAll();
  }

  getById(id) {
    return User.findByPk(id);
  }

  create(user) {
    return User.create(user);
  }

  async update(id, user) {
    await User.update(user, { where: { id } });
  }

  async deleteById(id) {
    await User.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new UsersService();
