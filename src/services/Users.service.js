const { User } = require('../models/User.model');

function createUserService() {
  return {
    getAllUsers: async () => {
      const allUsers = await User.findAll();

      return allUsers;
    },
    createUser: async (name, updatedAt) => {
      const newUser = await User.create({ name, updatedAt });

      return newUser;
    },

    getUserById: async (id) => {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('not found');
      }

      return user;
    },

    updateUserById: async (id, name) => {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('not found');
      }

      const updatedUser = await user.update({ name });

      return updatedUser;
    },

    deleteUserById: async (id) => {
      const deletedCount = await User.destroy({
        where: { id: id },
      });

      if (!deletedCount) {
        throw new Error('not found');
      }
    },
  };
}

module.exports = {
  createUserService,
};
