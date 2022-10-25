'use strict';

const { sequelize } = require('../db/dbInit');
const { User } = require('../db/userModel');

class UsersService {
  isValidUserBody(userBody, chekEvery = false) {
    const userKeys = [
      'name',
    ];

    const userKeysToCheck = Object.keys(userBody);

    if (
      !userKeysToCheck.length
      || !userKeysToCheck.every(key => userKeys.includes(key))
    ) {
      return false;
    }

    if (
      chekEvery
      && !userKeys.every(key => userKeysToCheck.includes(key))
    ) {
      return false;
    }

    return true;
  }

  async addUser(name) {
    try {
      const maxId = await User.findAll({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('id')), 'max_id'],
        ],
      });

      const nextId = maxId[0].get('max_id')
        ? maxId[0].get('max_id') + 1
        : 1;

      const newUser = await User.create({
        id: nextId,
        name,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const foundUser = await User.findAll({
        where: { id },
      });

      return foundUser[0];
    } catch (error) {
      throw error;
    }
  }

  async deletUserById(id) {
    try {
      const deletResult = await User.destroy({
        where: { id },
      });

      return deletResult === 1;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(id, { name }) {
    const t = await sequelize.transaction();

    try {
      await User.update({ name }, {
        where: { id },
      }, { transaction: t });

      const updatedUser = await User.findAll({
        where: { id },
      }, { transaction: t });

      await t.commit();

      return updatedUser[0];
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};

module.exports = { UsersService };
