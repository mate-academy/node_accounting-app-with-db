import * as userService from '../services/users.js';

export async function getAll(req, res) {
  const users = await userService.getAll();

  res.send(users);
}

export async function getOne(req, res) {
  const { userId } = req.params;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.end(`User with id ${userId} was not found`);

    return;
  }

  res.send(foundUser);
}

export async function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('You should pass the mandatory "name" field in the object');

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

export async function remove(req, res) {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send(`User with id ${userId} was not found`);

    return;
  }

  await userService.remove(userId);

  res.sendStatus(204);
}

export async function update(req, res) {
  const { userId } = req.params;
  const { name: newName } = req.body;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send(`User with id ${userId} was not found`);

    return;
  }

  if (!newName || typeof newName !== 'string') {
    res.statusCode = 400;
    // eslint-disable-next-line max-len
    res.send('To update a user it is necessary to pass the "name" field in the object.');

    return;
  }

  const updatedUser = await userService.update(userId, newName);

  res.send(updatedUser);
}
