const { model: userModel } = require('../models/User.model');

const controller = {
  async getUsers(req, res) {
    const users = await userModel.getUsers();

    res.json(users);
  },
  async getUser(req, res) {
    const { id } = req.params;
    const user = await userModel.getUser(parseInt(id, 10));

    if (user === null) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(user);
  },
  async createUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const newUser = await userModel.createUser(name);

    res.status(201).json(newUser);
  },
  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await userModel.deleteUser(parseInt(id, 10));

    if (deletedUser === 0) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(204).end();
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const updatedUserData = req.body;

    if (Object.keys(updatedUserData).length === 0) {
      res.status(400).json({ message: 'No data provided for update' });

      return;
    }

    const updatedUser = await userModel.updateUser(
      parseInt(id, 10),
      updatedUserData.name,
    );

    if (updatedUser === null) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(updatedUser);
  },
};

module.exports = {
  controller,
};
