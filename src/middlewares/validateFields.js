function validateFields(fields) {
  return function (req, res, next) {
    const extractedValues = {};

    fields.forEach((field) => {
      const { [field]: value } = req.body;

      extractedValues[field] = value;
    });

    if (Object.values(extractedValues).every((value) => value !== undefined)) {
      return next();
    } else {
      res.sendStatus(400);
    }
  };
}

module.exports = { validateFields };
