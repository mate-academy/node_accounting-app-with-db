'use strict';

const moment = require('moment-timezone');

function checkIsReqBodyValid(
  params,
  listOfExpectedParams,
  isAllRaramsRequired = true,
) {
  if (Object.keys(params).length === 0) {
    return false;
  }

  if (isAllRaramsRequired) {
    return listOfExpectedParams.every(({ key, type }) => {
      const paramValue = params[key];

      return params.hasOwnProperty(key) && isValidParam(paramValue, type);
    });
  } else {
    const hasAtLeastOneValidParam = listOfExpectedParams
      .some(({ key, type }) => {
        const paramValue = params[key];

        return isValidParam(paramValue, type);
      });

    const hasNoExtraParams = Object.keys(params).every(param => {
      return listOfExpectedParams
        .some(expectedParam => expectedParam.key === param);
    });

    return hasAtLeastOneValidParam && hasNoExtraParams;
  }
}

function isValidParam(paramValue, type) {
  if (paramValue === undefined || paramValue === null) {
    return false;
  }

  switch (type) {
    case 'string':
      return typeof paramValue === 'string';

    case 'number':
      return typeof paramValue === 'number';

    case 'string($date-time)':
      return typeof paramValue === 'string'
        && moment(paramValue, moment.ISO_8601, true).isValid();

    case 'Array string':
      return Array.isArray(paramValue)
        && paramValue.every(item => typeof item === 'string');

    case 'Array number':
      return Array.isArray(paramValue)
        && paramValue.every(item => typeof item === 'number');
  }
}

module.exports = { checkIsReqBodyValid };
