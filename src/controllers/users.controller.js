import * as userService from '../services/users.service.js';
import pkg from 'http-errors';

const { NotFound } = pkg;

const getAllUsers = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getUserById = async(req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.getOne(userId);

    if (!user) {
      next(new NotFound('User not found'));
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async(req, res, next) => {
  const { name } = req.body;

  try {
    const newUser = await userService.createOne(name);

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async(req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    const updatedUser = await userService.updateOne(userId, name);

    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async(req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.getOne(userId);

    if (!user) {
      next(new NotFound('User not found'));
    }

    await userService.deleteOne(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
