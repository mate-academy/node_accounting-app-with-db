const userService = require('../service/userService');

const getAll = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const getById = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).send({ message: 'ID should be numeric' });
  }

  try {
    const user = await userService.getUserById(+id);

    if (!user) {
      res.status(404).json({ message: 'No such user' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'name is required' });
  }

  try {
    const result = await userService.createUser(name);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (isNaN(id) || !name) {
    return res.status(400).send({ message: 'Invalid input' });
  }

  try {
    const result = await userService.updateUser(+id, name);

    if (!result) {
      res.status(404).json({ message: 'No such user' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).send({ message: 'ID should be numeric' });
  }

  try {
    const result = await userService.deleteUser(+id);

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No such user' });
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
