const express = require('express');
const { User } = require('../models/User.model');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = await User.create(req.body);

  res.status(201).json(user);
});

router.get('/:id', async (req, res) => {
  const id = +req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  await user.destroy();

  res.sendStatus(204);
});

router.patch('/:id', async (req, res) => {
  const id = +req.params.id;
  const name = req.body.name;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  await user.update(req.body);

  res.status(200).json(user);
});

module.exports = router;
