const { User } = require('../models/User.model');

const userService = {
  getAll: async () => {
    return User.findAll();
  },

  getById: async (id) => {
    return User.findByPk(id);
  },

  create: async (name) => {
    return User.create({ name });
  },

  removeById: async (id) => {
    await User.destroy({ where: { id } });
  },

  updateById: async ({ id, name }) => {
    const user = await userService.getById(id);

    if (!user) {
      return null;
    }

    await user.update({ name });

    return user;
  },

  clear: async () => {
    await User.destroy({ truncate: true });
  },
};

module.exports = {
  userService,
};
