'use strict';

const PORT = 3000;

const STATUS_MESSAGES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  OPERATION_SUCCESSFUL: 200,
  NEW_RESOURCE_CREATED: 201,
  ITEM_DELETED: 204,
};

module.exports = {
  PORT,
  STATUS_MESSAGES,
};
