'use strict';

const { checkIsReqBodyValid } = require('../helpers/checkIsReqBodyValid.js');
const userService = require('../services/user.service.js');

function validateReqParamsForCreateAndUpdate(req, res, next) {
  const listOfExpectedParams = [{
    key: 'name',
    type: 'string',
  }];
  const isReqBodyValid = checkIsReqBodyValid(req.body, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);

    return;
  }

  next();
}

async function validateIdReqParam(req, res, next) {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  next();
}

module.exports = {
  validateReqParamsForCreateAndUpdate,
  validateIdReqParam,
};
