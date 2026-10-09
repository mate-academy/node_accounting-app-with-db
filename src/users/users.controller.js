const userService = require('./users.service.js');

exports.getUsers = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

exports.getUser = async (req, res) => {
  const user = await userService.getById(Number(req.params.id));

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.status(200).json(user);
};

exports.createUser = async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    res.sendStatus(400);

    return;
  }

  const users = await userService.create({ name: name.trim() });

  res.status(201).json(users);
};

exports.updateUser = async (req, res) => {
  const user = await userService.getById(Number(req.params.id));
  const changes = req.body;

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.status(200).json(await userService.update(user.id, changes));
};

exports.removeUser = async (req, res) => {
  const deleted = await userService.remove(Number(req.params.id));

  if (!deleted) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.sendStatus(204);
};
