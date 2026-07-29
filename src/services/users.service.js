const {
  models: { User },
} = require('../models/models.js');

class UserService {
  static normalize({ id, name }) {
    return { id, name };
  }

  static getAll() {
    return User.findAll({ order: [['id']] });
  }

  static getById(id) {
    return User.findByPk(id);
  }

  static create(name) {
    return User.create({ name });
  }

  static deleteById(id) {
    return User.destroy({
      where: { id },
      force: true,
    });
  }

  static async update({ id, name }) {
    const [affectedCount, updatedRows] = await User.update(
      { name },
      {
        where: { id },
        returning: true,
      },
    );

    return affectedCount ? updatedRows[0] : null;
  }
}

module.exports = UserService;
