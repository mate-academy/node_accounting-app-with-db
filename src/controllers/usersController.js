const { User } = require('../models/User.model.js');

async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.sendStatus(500);
  }
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const user = await User.create({ name: name.trim() });

  res.status(201).send(user);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const user = await User.findByPk(numericId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  const user = await User.destroy({
    where: { id: numericId },
  });

  if (user === 0) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.sendStatus(400);
  }

  if (!name || !name.trim()) {
    return res.sendStatus(400);
  }

  const [updatedCount, updatedRows] = await User.update(
    { name: name.trim() },
    { where: { id: numericId }, returning: true },
  );

  if (updatedCount === 0) {
    return res.sendStatus(404);
  }

  res.send(updatedRows[0]);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
