'use strict';

const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
} = require('../services/usersService');
const {
  NOT_EXIST_CODE,
  INVALID_PARAMETERS_CODE,
  SUCCESSFUL_DELETION_CODE,
  SUCCESSFUL_CREATION_CODE,
  SERVER_SIDE_ERROR_CODE,
} = require('../utils/constants');
const { validateId } = require('../utils/validateId');
const { prepareIdFromReqUrl } = require('../utils/prepareIdFromReqUrl');

async function get(req, res) {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
    throw err;
  }
}

async function getOne(req, res) {
  const id = prepareIdFromReqUrl(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const user = await getUserById(id);

  if (!user) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  res.send(user);
}

async function remove(req, res) {
  const id = prepareIdFromReqUrl(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const user = await getUserById(id);

  if (!user) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  try {
    await deleteUser(id);
    res.sendStatus(SUCCESSFUL_DELETION_CODE);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
    throw err;
  }
}

async function patch(req, res) {
  const id = prepareIdFromReqUrl(req);

  const dataToUpdate = {
    ...req.body,
    id,
  };

  if (validateId(id) || typeof dataToUpdate.name !== 'string') {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const user = await getUserById(id);

  if (!user) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  try {
    const updatedUser = await updateUser(dataToUpdate);

    res.send(updatedUser);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
    throw err;
  }
}

async function post(req, res) {
  const dataToPost = {
    ...req.body,
  };

  if (!dataToPost.name) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  try {
    const createdUser = await createUser(dataToPost);

    res
      .status(SUCCESSFUL_CREATION_CODE)
      .send(createdUser);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
    throw err;
  }
}

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
