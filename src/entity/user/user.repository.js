const { User } = require('../../models/User.model');

const normalizeUser = (user) => {
  return {
    id: user.id,
    name: user.name,
  };
};

const usersRepository = {
  getAll: async () => {
    const users = await User.findAll();

    return users.map(normalizeUser);
  },

  createUser: async (name) => {
    const newUser = await User.create({ name });

    return normalizeUser(newUser);
  },

  getUserById: async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return normalizeUser(user);
  },

  updateUser: async ({ name, id }) => {
    await User.update({ name }, { where: { id } });

    const updated = await User.findByPk(id);

    return normalizeUser(updated);
  },

  deleteUser: async (id) => {
    await User.destroy({
      where: {
        id,
      },
    });

    return true;
  },
};

module.exports = { usersRepository };
