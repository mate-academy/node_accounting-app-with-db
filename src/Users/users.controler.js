const usersService = require('./users.service');

class UsersController {
  async getAll(req, res) {
    try {
      const usersList = await usersService.getAllUsers();

      res.status(200).send(usersList);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const id = Number(req.params.id);
      const user = await usersService.getOneUser(id);

      if (!user) {
        res.status(404).send({ message: 'User not found' });

        return;
      }

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async postOne(req, res) {
    try {
      const userData = req.body;
      const { name } = userData;

      const isRequiredFieldsMissing = !name;
      const wrongData = typeof name !== 'string';

      if (isRequiredFieldsMissing || wrongData) {
        res.status(400).send({ message: 'Wrong data' });

        return;
      }

      const newUser = await usersService.createUser(userData);

      res.status(201).send(newUser);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async updateOne(req, res) {
    try {
      const paramsToUpdate = req.body;
      const id = Number(req.params.id);
      const { name } = paramsToUpdate;

      // Only validate fields that are being updated
      const wrongData = name !== undefined && typeof name !== 'string';

      if (wrongData) {
        res.status(400).send({ message: 'Wrong data' });

        return;
      }

      const updatedUser = await usersService.updateUser(id, paramsToUpdate);

      if (!updatedUser) {
        res.status(404).send({ message: 'User not found' });

        return;
      }

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);
      const deletedUser = await usersService.deleteUser(id);

      if (!deletedUser) {
        res.status(404).send({ message: 'User not found' });

        return;
      }

      res.status(204).send();
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }
}

const usersController = new UsersController();

module.exports = usersController;
