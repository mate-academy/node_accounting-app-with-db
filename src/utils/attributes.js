'use strict';

function getAttributes(Model) {
  return Object.keys(Model.rawAttributes);
}

function getRequiredAttributes(Model, ...excludedAttributes) {
  const attributes = Object.keys(Model.rawAttributes);

  return attributes.filter((attribute) => {
    const isRequired = Model.rawAttributes[attribute].allowNull === false;
    const isExcluded = excludedAttributes.includes(attribute);

    return isRequired && !isExcluded;
  });
}

function allRequiredAttributesEntered(attributes, dataToCheck) {
  return attributes.every((attribute) => {
    return Object.hasOwn(dataToCheck, attribute) && dataToCheck[attribute];
  });
}

module.exports = {
  getAttributes,
  getRequiredAttributes,
  allRequiredAttributesEntered,
};
