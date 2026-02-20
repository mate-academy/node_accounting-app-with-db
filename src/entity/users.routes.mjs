import express from 'express';
import userController from './users.repository.mjs';

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const data = await userController.getAll();

    res.statusCode = 200;
    res.send(data);
  } catch (error) {
    res.statusCode = 500;
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const targetUser = await userController.getById(id);

    if (!targetUser) {
      res.statusCode = 404;
      res.end();

      return;
    }

    res.statusCode = 200;
    res.send(targetUser);
  } catch (error) {
    res.statusCode = 500;
  }
});

router.post('/', express.json(), async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim() || typeof name !== 'string') {
      res.statusCode = 400;
      res.end();

      return;
    }

    const user = await userController.create(name);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    res.statusCode = 500;
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteStatus = await userController.deleteUser(id);

    if (!deleteStatus) {
      res.statusCode = 404;

      res.end();

      return;
    }

    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 500;
  }
});

router.patch('/:id', express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name?.trim()) {
      res.statusCode = 400;
      res.end();

      return;
    }

    const user = await userController.update(id, name);

    if (!user) {
      res.statusCode = 404;
      res.end();

      return;
    }

    res.statusCode = 200;
    res.send(user);
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

export { router };
