const { Router } = require('express');
const { User } = require('../models/User.model');

const router = Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const user = await User.create({ name });

  res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name } = req.body;

  user.name = name;
  await user.save();

  res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await user.destroy();
  res.sendStatus(204);
});

module.exports = router;
