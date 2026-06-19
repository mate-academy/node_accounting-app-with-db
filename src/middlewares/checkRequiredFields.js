function checkRequiredFields(fields) {
  return function (req, res, next) {
    const extractedValues = fields.reduce(
      (result, field) => ({
        ...result,
        [field]: req.body[field],
      }),
      {},
    );

    if (Object.values(extractedValues).every((value) => value !== undefined)) {
      return next();
    } else {
      res.sendStatus(400);
    }
  };
}

module.exports = { checkRequiredFields };
