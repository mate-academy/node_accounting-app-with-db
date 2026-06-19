const {
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getAllUsersService,
} = require('../services/user-service');

const createUserController = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await createUserService(user);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ issue: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  return res.status(200).json(await getAllUsersService());
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(Number(id));

    res.status(200).json(user);
  } catch (error) {
    if (error.message.includes('User not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updatedUser = await updateUserService(Number(id), user);

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message.includes('User not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUserService(Number(id));

    res.status(204).end();
  } catch (error) {
    if (error.message.includes('User not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

module.exports = {
  createUserController,
  getAllUsersController,

  getUserByIdController,
  updateUserController,
  deleteUserController,
};
