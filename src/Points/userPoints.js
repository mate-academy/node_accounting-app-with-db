'use strict';

const { getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser } = require('../Postgre/postgreUser');

function userPoints(app) {
  app.get('/', async(req, res) => {
    res
      .status(200)
      .send(await getAllUsers());
  });

  app.get('/:userID', async(req, res) => {
    const { userID } = req.params;
    const foundedUser = await getUserByID(userID);

    if (!userID) {
      res
        .status(400)
        .send('userID is requered');

      return;
    }

    if (foundedUser.length === 0) {
      res.sendStatus(404);
      res.send('User is not found');

      return;
    }

    res
      .status(200)
      .send(foundedUser);
  });

  app.patch('/:userID', async(req, res) => {
    const { userID } = req.params;
    const { name } = req.query;
    const foundedUser = await updateUser(userID, name);

    if (!userID) {
      res
        .status(400)
        .send('userID is requered');

      return;
    }

    if (!foundedUser) {
      res
        .status(404)
        .send('User is not found');

      return;
    }

    res
      .status(200)
      .send(foundedUser);
  });

  app.post('/', async(req, res) => {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .send('Name is require');
    }

    const newUser = await createUser(name);

    res
      .status(201)
      .send(newUser);
  });

  app.delete('/:userID', async(req, res) => {
    const { userID } = req.params;
    const removedUser = await deleteUser(userID);

    if (removedUser.length) {
      res
        .status(204);

      return;
    }

    res
      .status(404)
      .send('User is not found');
  });
}
module.exports = { userPoints };
