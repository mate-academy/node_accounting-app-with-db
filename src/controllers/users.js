'use strict';

const { UsersService } = require('../services/users');

const initUserController = () => {
  const usersService = new UsersService();

  return {
    usersService,

    async addUser(req, res) {
      const { name } = req.body;

      if (!name) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      try {
        const newUser = await usersService.addUser(name);

        res
          .status(201)
          .send(newUser);
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },

    async getAllUsers(req, res) {
      try {
        const users = await usersService.getAllUsers();

        res
          .status(200)
          .send(users);
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },

    async getUserById(req, res) {
      const { id } = req.params;

      try {
        const foundUser = await usersService.getUserById(id);

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

    async deleteUserById(req, res) {
      try {
        const isSucceed = await usersService.deletUserById(req.params.id);

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

    async updateUserById(req, res) {
      const { id } = req.params;
      const { body } = req;

      if (!id || !usersService.isValidUserBody(body, true)) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      try {
        const updatedUser = await usersService.updateUserById(id, body);

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
  };
};

module.exports = {
  initUserController,
};
