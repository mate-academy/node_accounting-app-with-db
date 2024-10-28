const userService = require('./../services/user.service');

const validateUser = () => {
  return async (req, res, next) => {
    const { id } = req.params;
    const entry = await userService.getById(id);

    if (!entry) {
      res.sendStatus(404);
    } else {
      req.entry = entry;
      next();
    }
  };
};

module.exports = { validateUser };
