'use strict';

const {
  isValidUserBody,
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require('../services/users');

module.exports = {
  async operateAddUser(req, res) {
    const { body } = req;

    if (!isValidUserBody(body, true)) {
      res
        .status(400)
        .send('Bad request');

      return;
    };

    try {
      const newUser = await addUser(body);

      res
        .status(201)
        .send(newUser);
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },

  async operateGetAllUsers(req, res) {
    try {
      const users = await getAllUsers();

      res
        .status(200)
        .send(users);
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },

  async operateGetUserById(req, res) {
    const { id } = req.params;

    try {
      const foundUser = await getUserById(id);

      if (!foundUser) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(200)
        .send(foundUser);
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },

  async operateUpdateUserById(req, res) {
    const { id } = req.params;
    const { body } = req;

    if (!id || !isValidUserBody(body)) {
      res
        .status(400)
        .send('Bad request');

      return;
    };

    try {
      const updatedUser = await updateUserById(id, body);

      if (!updatedUser) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(200)
        .send(updatedUser);
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },

  async operateDeleteUserById(req, res) {
    const { id } = req.params;

    try {
      const isSucceed = await deleteUserById(id);

      if (!isSucceed) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(204)
        .end();
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },
};
