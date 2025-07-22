const { User } = require('../models/User.model');

class UserService {
  async resetData() {
    // Use raw SQL to handle CASCADE properly
    const { sequelize } = require('../db');

    await sequelize.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
  }

  async getAllUsers() {
    return User.findAll();
  }

  async createUser(userData) {
    const { name } = userData;

    if (!name) {
      throw new Error('Name is required');
    }

    const user = await User.create({ name });

    return user;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(id, userData) {
    const { name } = userData;

    if (!name) {
      throw new Error('Name is required');
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = name;
    await user.save({ silent: true });

    return user;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();

    return true;
  }
}

module.exports = new UserService();
