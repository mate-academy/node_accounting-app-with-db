function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  next();
}

module.exports = {
  validateName,
};
