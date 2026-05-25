const {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  patchUserById,
} = require('../services/users.service.js');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        message: 'Name cannot be blank',
      });
    }

    const { id, name: nameUser } = await createUser(name);

    return res.status(201).json({
      id,
      name: nameUser,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOnce = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        message: 'Id is not valid',
      });
    }

    const user = await getUserById(Number(id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOnce = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        message: 'Id is not valid',
      });
    }

    const isDelete = await deleteUserById(Number(id));

    if (!isDelete) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const patchOnce = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'id is not valid',
      });
    }

    if (!name || name.trim() === '') {
      return res.status(400).json({
        message: 'name is not valid',
      });
    }

    const [updatedRowsCount] = await patchUserById(id, name);

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'user not found' });
    }

    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  findAll,
  findOnce,
  deleteOnce,
  patchOnce,
};
