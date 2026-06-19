const {
  models: { User },
} = require('../models/models');

function handleControllerError(res, action, error) {
  // eslint-disable-next-line no-console
  console.error(`Smth bad with: ${action}`, error);
  res.sendStatus(500);
}

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();

    res.send(users);
  } catch (error) {
    handleControllerError(res, 'get', error);
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  } catch (error) {
    handleControllerError(res, 'get', error);
  }
}

async function create(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  } catch (error) {
    handleControllerError(res, 'create', error);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    await user.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleControllerError(res, 'remove', error);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(Number(id));

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    user.name = name;

    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    handleControllerError(res, 'update', error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  remove,
  create,
  update,
};
