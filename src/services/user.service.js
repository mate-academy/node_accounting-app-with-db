/* eslint-disable no-console */
const { User } = require('../models/User.model');

const getAll = async () => {
  try {
    const users = await User.findAll({
      order: ['name'],
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

const create = async (name) => {
  try {
    const user = await User.create({ name });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    await User.destroy({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

const change = async (id, name) => {
  try {
    await User.update({ name }, { where: { id } });

    return await User.findByPk(id);
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  change,
};
