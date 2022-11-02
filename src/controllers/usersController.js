import * as userServices from '../services/usersService.js';

export const getUsers = async(req, res) => {
  const users = await userServices.getUsers();

  res.send(
    users.map(userServices.normalize)
  );
};

export const getUser = async(req, res) => {
  const { userId } = req.params;

  try {
    const searchUser = await userServices.getUser(userId);

    res.send(userServices.normalize(searchUser));
  } catch (error) {
    res.sendStatus(404);
  }
};

export const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  res.statusCode = 201;
  res.send(await userServices.createUser(name));
};

export const removeUser = async(req, res) => {
  const { userId } = req.params;

  try {
    await userServices.removeUser(userId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const updateUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);
  }

  try {
    const foundUser = await userServices.getUser(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    await userServices.updateUser(userId, name);

    res.send(await userServices.getUser(userId));
  } catch (error) {
    res.sendStatus(404);
  }
};
