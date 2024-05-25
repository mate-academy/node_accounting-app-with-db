const { response } = require('../constants/response');
const {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUser,
  updateUser,
  normalize,
} = require('../models/User.model');

async function httpGetAllUsers(req, res) {
  const users = await getAllUsers();

  if (!users) {
    return res
      .status(response[503].statusCode)
      .json({ success: false, error: response[503].messages.serviceOrUsers });
  }

  return res.status(response[200].statusCode).json(users.map(normalize));
}

async function httpPostUser(req, res) {
  const { name } = req.body;

  if (!name || !name.trim() || typeof name !== 'string') {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noName });
  }

  const newUser = await createNewUser(name);

  if (!newUser) {
    return res
      .status(response[503].statusCode)
      .json({ success: false, error: response[503].messages.service });
  }

  return res.status(response[201].statusCode).json(normalize(newUser));
}

async function httpGetUserById(req, res) {
  const { id } = req.params;

  if (!id.trim()) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noID });
  }

  const user = await getUserById(+id);

  if (!user) {
    return res
      .status(response[404].statusCode)
      .json({ success: false, error: response[404].messages.noUser });
  }

  return res.status(response[200].statusCode).json(normalize(user));
}

async function httpDeleteUser(req, res) {
  const { id } = req.params;

  if (!id.trim()) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noID });
  }

  const deleted = await deleteUser(+id);

  if (deleted) {
    return res.status(response[204].statusCode).json({});
  } else {
    return res
      .status(response[404].statusCode)
      .json({ error: response[404].messages.noUser });
  }
}

async function httpUpdateUser(req, res) {
  const data = req.body;
  const { id } = req.params;

  if (!Object.values(data).length) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noData });
  }

  const newUser = await updateUser(+id, data);

  if (!newUser) {
    return res
      .status(response[404].statusCode)
      .json({ success: false, error: response[404].messages.noUser });
  }

  return res.status(response[200].statusCode).json(normalize(newUser));
}

module.exports = {
  httpGetAllUsers,
  httpPostUser,
  httpGetUserById,
  httpDeleteUser,
  httpUpdateUser,
};
