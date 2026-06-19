const validFields = (expense, requiredFields) => {
  const errors = [];

  requiredFields.forEach((field) => {
    const name = Object.keys(field)[0];
    const expectedType = field[name];

    if (!expense[name]) {
      errors.push(`${name} is required`);
    } else {
      const receivedType = typeof expense[name];

      if (receivedType !== expectedType) {
        errors.push(
          `${name} is required to be a ${expectedType} but received a ${receivedType}`,
        );
      }
    }
  });

  return errors;
};

module.exports = { validFields };
