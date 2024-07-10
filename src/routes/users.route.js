const express = require('express');
const controller = require('../controllers/users.controller');

const GET_ALL_USERS = '/';
const GET_ONE_USER = '/:id';
const CREATE_USER = '/';
const UPDATE_USER = '/:id';
const DELETE_USER = '/:id';

const usersRoute = express.Router();

usersRoute.get(GET_ALL_USERS, controller.get);
usersRoute.get(GET_ONE_USER, controller.getOne);
usersRoute.post(CREATE_USER, controller.post);
usersRoute.patch(UPDATE_USER, controller.patch);
usersRoute.delete(DELETE_USER, controller.deleting);

module.exports = {
  usersRoute,
};
