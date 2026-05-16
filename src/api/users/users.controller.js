const { usersService } = require('../../services/users/users.service');

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.send(users);
  } catch (error) {
    res.status(500).send('Please try later');
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await usersService.create(name);

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Please try later');
  }
};

const getById = async (req, res) => {
  try {
    const user = await usersService.getById(+req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Please try later');
  }
};

const remove = async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await usersService.deleteById(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Please try later');
  }
};

const update = async (req, res) => {
  try {
    const id = +req.params.id;
    const { name } = req.body;
    const user = await usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = await usersService.update(id, name);

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send('Please try later');
  }
};

module.exports = {
  usersController: {
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
