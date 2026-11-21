const { TIME } = require('sequelize');

function createUserController(UserService) {
  return {
    getAllUsers: async (req, res) => {
      try {
        res.statusCode = 200;

        const users = await UserService.getAllUsers();

        res.send(users);
      } catch {
        res.sendStatus(404);
      }
    },

    createUser: async (req, res) => {
      const { name } = req.body;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      try {
        res.statusCode = 201;

        const user = await UserService.createUser(name);

        res.send(user);
      } catch {
        res.sendStatus(500);
      }
    },

    getUserById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.sendStatus(400);
      }

      try {
        const user = await UserService.getUserById(id);

        res.statusCode = 200;
        res.send(user);
      } catch {
        res.sendStatus(404);
      }
    },

    updateUserById: async (req, res) => {
      const { id } = req.params;
      const { name } = req.body;

      if (!id || !name) {
        return res.sendStatus(400);
      }

      try {
        const user = await UserService.updateUserById(id, name, new TIME());

        res.statusCode = 200;
        res.send(user);
      } catch {
        res.sendStatus(404);
      }
    },

    deleteUserById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        res.sendStatus(400);

        return;
      }

      try {
        await UserService.deleteUserById(id);
        res.statusCode = 204;
        res.end();
      } catch {
        res.sendStatus(404);
      }
    },
  };
}

module.exports = {
  createUserController,
};
