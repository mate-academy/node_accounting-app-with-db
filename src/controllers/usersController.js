const { models } = require('../models/models.js');

const createUserController = () => {
  const { User } = models;

  const getUser = async (request, response) => {
    try {
      const result = await User.findAll();

      response.status(200).json(result);
    } catch (erro) {
      return response.status(500).json({ error: erro });
    }
  };

  const postAddUser = async (request, response) => {
    try {
      const { name } = request.body;

      if (!name) {
        return response.sendStatus(400);
      }

      const user = await User.create({ name });

      response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const getOne = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
      const get = await User.findOne({
        where: { id: id },
      });

      if (!get) {
        return response.sendStatus(404);
      }

      response.status(200).json(get);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
      const user = await User.findOne({ where: { id: id } });

      if (!user) {
        return response.sendStatus(404);
      }
      await User.destroy({ where: { id: id } });
      response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const editUser = async (request, response) => {
    const id = parseInt(request.params.id);
    const { name } = request.body;

    try {
      const isUser = await User.findOne({ where: { id: id } });

      if (!isUser) {
        return response.sendStatus(404);
      }

      const toEdit = await User.update(
        { name },
        { where: { id: id }, returning: true },
      );

      response.status(200).json(toEdit[1][0]);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  return {
    getUser,
    postAddUser,
    getOne,
    deleteUser,
    editUser,
  };
};

module.exports = {
  createUserController,
};
