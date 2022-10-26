'use strict';

const { sequelize } = require('../db/initDb');
const { User } = require('../db/userModel');
const { isValidBody } = require('./utils');

module.exports = {
  isValidUserBody(userBody, allFieldsRequired = false) {
    const userTemplate = [
      'name',
    ];

    return isValidBody(userBody, userTemplate, allFieldsRequired);
  },

  async addUser(body) {
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
        ...body,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  },

  async getAllUsers() {
    try {
      const users = await User.findAll({
        order: [ 'id' ],
      });

      return users;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id) {
    try {
      const foundUser = await User.findByPk(id);

      return foundUser;
    } catch (error) {
      throw error;
    }
  },

  async deleteUserById(id) {
    try {
      const deletResult = await User.destroy({
        where: { id },
      });

      return deletResult === 1;
    } catch (error) {
      throw error;
    }
  },

  async updateUserById(id, newData) {
    const t = await sequelize.transaction();

    try {
      await User.update(
        newData,
        { where: { id } },
        { transaction: t }
      );

      const updatedUser = await User.findByPk(id, { transaction: t });

      await t.commit();

      return updatedUser;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
