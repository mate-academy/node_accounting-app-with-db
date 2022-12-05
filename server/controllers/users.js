'use strict';

const {
  getAll,
  createUser,
  getById,
  updateUser,
  removeUser,
} = require('../services/users.js');

  async function getALLAppUsers(req, res) {
    const users = await getAll();

    res.send(users);

    res.statusCode = 200;
  }

   async function postOneUser(req, res) {
    const { name } = await req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await createUser(name);

    res.send(newUser);
    res.statusCode = 201;
  }


  async function patchOneUser(req, res) {
    const { id } = await req.params;

    const foundUser = await getById(+id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = await req.body;

    updateUser(name, +id);

    res.send(200);
  }

  async function deleteOneUser(req, res) {
    const { id } = await req.params;

    const foundUser = await getById(+id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const users = await removeUser(+id);
    res.sendStatus(204);
  }

  async function getOneUser(req, res) {
    const { id } = await req.params;

    const foundUser = await getById(+id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
    res.sendStatus(200);
  }

module.exports = {
  getALLAppUsers,
  postOneUser,
  patchOneUser,
  deleteOneUser,
  getOneUser,
};
