const userService = require('../services/userService');

module.exports = {
  async getAll(_req, res) {
    try {
      const users = await userService.getAll();

      res.status(200).send(users);
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async getOne(req, res) {
    try {
      const id = +req.params.id;

      const user = await userService.getById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async create(req, res) {
    try {
      const { name } = req.body;

      const user = await userService.create({ name });

      res.status(201).send(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async update(req, res) {
    try {
      const currentId = +req.params.id;

      const { name, id } = req.body;

      await userService.update({ currentId, id, name });

      const updatedUser = await userService.getById(id ?? currentId);

      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
  async remove(req, res) {
    try {
      const id = +req.params.id;

      await userService.remove(id);

      res.sendStatus(204);
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
};
