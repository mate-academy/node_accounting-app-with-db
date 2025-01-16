const { User } = require('../models/User.model');

const getAllUsers = async () => {
  try {
    const users = await User.findAll();

    return { data: users };
  } catch (error) {
    return { error: 'Error to get some Users' };
  }
};

const getUserBYID = async (id) => {
  try {
    if (!id) {
      return { error: 'Non corect ID' };
    }

    const parseId = +id;

    const targetUser = await User.findByPk(parseId);

    if (!targetUser) {
      return { error: 'User not found' };
    }

    return { data: targetUser };
  } catch (error) {
    return { error: 'Failed to get user' };
  }
};

const crateUsers = async (name) => {
  try {
    if (!name) {
      return { error: 'False Name' };
    }

    const newUser = await User.create({ name });

    return { data: newUser };
  } catch (error) {
    return { error: 'You cant create some (Name) for User' };
  }
};

const deleteUsers = async (userId) => {
  try {
    if (!userId) {
      return { error: 'Invalid UserId (Sorry!)' };
    }

    const delUsers = await User.destroy({
      where: { id: userId },
    });

    if (!delUsers) {
      return { error: 'Not found some users with ID' };
    }

    return { data: delUsers };
  } catch (error) {
    return { error: 'Error to delete Users' };
  }
};

const updateUser = async (userId, updatedUser) => {
  try {
    const user = await User.findByPk(+userId);

    if (!user) {
      return { error: 'User not found' };
    }

    await user.update({ name: updatedUser });

    return { data: user };
  } catch (error) {
    return { error: 'Failed to update some Users' };
  }
};

const usersService = {
  getAllUsers,
  getUserBYID,
  crateUsers,
  deleteUsers,
  updateUser,
};

module.exports = usersService;
