import * as usersService from '../services/users.service.js';

export const get = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200)
  res.send(user);
};

export const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newUser = await usersService.create(name);

    res.status(201)
    res.send(newUser);
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await usersService.getById(id))) {
    return res.status(404).json({ error: 'User not found' });
  }

  await usersService.remove(id);

  res.sendStatus(204);
};


export const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await usersService.update({ id, name });

  res.status(200).json({ message: 'User updated successfully' });
};
