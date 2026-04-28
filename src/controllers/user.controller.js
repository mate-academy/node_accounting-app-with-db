const userService = require('../services/user.service');

class UserController {
  get = async (req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
  };

  getOne = async (req, res) => {
    const id = Number(req.params.id);

    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).json(user);
  };

  create = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    const newUser = await userService.create({ name });

    res.status(201).json(newUser);
  };

  update = async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send({ message: 'Name is required' });
    }

    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const updatedUser = await userService.update(id, { name });

    res.status(200).json(updatedUser);
  };

  remove = async (req, res) => {
    const id = Number(req.params.id);
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await userService.remove(id);
    res.sendStatus(204);
  };
}
module.exports = new UserController();
