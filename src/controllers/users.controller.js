const getAllUsers = (users) => async (req, res) => {
  try {
    const data = await users.findAll();

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const postUsers = (users) => async (req, res) => {
  const { name, id } = req.body;

  if (id) {
    return res.status(400).send('Bad request');
  }

  if (typeof name !== 'string') {
    return res.status(400).send('Bad request');
  }

  try {
    const newUser = await users.create({ name });

    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getUserById = (users) => async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteUser = (users) => async (req, res) => {
  const { id } = req.params;

  const user = await users.findByPk(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await users.destroy({
    where: { id },
  });

  res.sendStatus(204);
};

const patchUsers = (users) => async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (typeof name !== 'string') {
      return res.status(400).send('Bad request');
    }

    const user = await users.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    user.name = name;
    await user.save();

    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

module.exports = {
  getAllUsers,
  postUsers,
  getUserById,
  deleteUser,
  patchUsers,
};
