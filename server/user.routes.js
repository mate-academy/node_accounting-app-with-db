'use strict';

const {
  getALLAppUsers,
  postOneUser,
  patchOneUser,
  deleteOneUser,
  getOneUser,
} = require('./controllers/users');

function InitUserRoutes(app) {
  app.get('/', getALLAppUsers);

  app.get('/:id', getOneUser);

  app.delete('/:id', deleteOneUser);

  app.post('/', postOneUser);

  app.patch('/:id', patchOneUser);
}

module.exports = {
  InitUserRoutes,
};
