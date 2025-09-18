// let users = [];
const { User } = require('../models/models').models;

module.exports = {
  getAll: async () => {
    return User.findAll();
  },

  getById: async (id) => {
    return User.findByPk(+id);
  },

  create: async (name) => {
    const user = await User.create({ name });

    return user;
  },

  edit: async (id, name) => {
    const user = await User.findByPk(+id);

    if (!user) {
      throw new Error();
    }

    return user.update({ name });
  },

  remove: async (id) => {
    const user = await User.findByPk(+id);

    if (!user) {
      throw new Error();
    }

    await user.destroy();
  },
};
