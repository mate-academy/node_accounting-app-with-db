'use strict';

module.exports = {
  isValidBody(bodyToCheck, template, allFieldsRequired = false) {
    const fieldsToCheck = Object.keys(bodyToCheck);

    if (
      !fieldsToCheck.length
      || !fieldsToCheck.every(field => template.includes(field))
    ) {
      return false;
    }

    if (
      allFieldsRequired
      && !template.every(field => fieldsToCheck.includes(field))
    ) {
      return false;
    }

    return true;
  },
};
