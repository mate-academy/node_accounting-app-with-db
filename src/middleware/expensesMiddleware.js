function expensesMiddleware(req, res, next) {
  const body = req.body;
  const { userId, spentAt, title, amount, category, note } = body;

  if (
    !userId ||
    !spentAt ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    res.sendStatus(400);
  }

  next();
}

module.exports = {
  expensesMiddleware,
};
