/* eslint-disable no-console */
const { models } = require('../models/models.js');
const User = models.User;
// const { User } = require('../models/User.model.js');

const getAll = async () => {
  try {
    return await User.findAll({ order: [['name', 'ASC']] });
  } catch (error) {
    console.log('Error getting useres', error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    console.log(`Error getting user with id ${id}`, error);
    throw error;
  }
};

const create = async (name) => {
  try {
    const user = await User.create({ name });

    return user;
  } catch (error) {
    console.log('Error creating user', error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (error) {
    console.log(`Error deleting user by ${id}`, error);
    throw error;
  }
};

const update = async ({ id, name }) => {
  const user = await getById(id);

  if (user) {
    try {
      await User.update({ name }, { where: { id } });
    } catch (error) {
      console.log(`Error updating user by id ${id}`, error);
      throw error;
    }
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
