const { models } = require('../models/models');
const { User } = models;

const usersService = {
  async getAll() {
    const result = await User.findAll();

    return result;
  },

  async getById(id) {
    return User.findByPk(id);
  },

  async addNew(name) {
    return User.create({ name });
  },

  async delete(id) {
    const result = await User.destroy({
      where: {
        id,
      },
    });

    return result ? 1 : null;
  },

  async update(id, newName) {
    const userToUpdate = await this.getById(id);

    if (!userToUpdate) {
      return null;
    }

    const changed = await User.update(
      { name: newName },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return changed;
  },
};

module.exports = {
  usersService,
};
