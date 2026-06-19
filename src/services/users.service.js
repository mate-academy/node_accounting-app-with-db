const { User } = require('../models/User.model');

async function getAll() {
  try {
    const users = await User.findAll();

    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
}

async function getById(id) {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
}

async function create(userName) {
  try {
    if (!userName) {
      throw new Error('Name is required');
    }

    const user = await User.create({ name: userName });

    return user;
  } catch (error) {
    throw new Error('Error creating user');
  }
}

async function deleteById(id) {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.destroy();

    return user;
  } catch (error) {
    throw new Error('Error deleting user');
  }
}

async function update({ id, name }) {
  try {
    if (!name) {
      return null; // or throw new Error('Name is required');
    }

    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    user.name = name;
    await user.save();

    return user;
  } catch (error) {
    throw new Error('Error updating user');
  }
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
