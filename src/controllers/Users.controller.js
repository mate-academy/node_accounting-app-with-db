const { TIME } = require('sequelize');

function sendJsonError(res, statusCode) {
  const messages = {
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error',
  };

  return res
    .status(statusCode)
    .set('Content-Type', 'application/json; charset=utf-8')
    .json({ error: messages[statusCode] });
}

function createUserController(UserService) {
  return {
    getAllUsers: async (req, res) => {
      try {
        res.statusCode = 200;

        const users = await UserService.getAllUsers();

        res.send(users);
      } catch {
        return sendJsonError(res, 404);
      }
    },

    createUser: async (req, res) => {
      const { name } = req.body;

      if (!name) {
        return sendJsonError(res, 400);
      }

      try {
        res.statusCode = 201;

        const user = await UserService.createUser(name);

        res.send(user);
      } catch {
        return sendJsonError(res, 500);
      }
    },

    getUserById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return sendJsonError(res, 400);
      }

      try {
        const user = await UserService.getUserById(id);

        res.statusCode = 200;
        res.send(user);
      } catch {
        return sendJsonError(res, 404);
      }
    },

    updateUserById: async (req, res) => {
      const { id } = req.params;
      const { name } = req.body;

      if (!id || !name) {
        return sendJsonError(res, 400);
      }

      try {
        const user = await UserService.updateUserById(id, name, new TIME());

        res.statusCode = 200;
        res.send(user);
      } catch {
        return sendJsonError(res, 404);
      }
    },

    deleteUserById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return sendJsonError(res, 400);
      }

      try {
        await UserService.deleteUserById(id);
        res.statusCode = 204;
        res.end();
      } catch {
        return sendJsonError(res, 404);
      }
    },
  };
}

module.exports = {
  createUserController,
};
