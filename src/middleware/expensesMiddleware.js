function expensesMiddleware(req, res, next) {
  const body = req.body;
  const { userId, spentAt, title, amount } = body;

  if (
    !userId ||
    !spentAt ||
    typeof title !== 'string' ||
    typeof amount !== 'number'
  ) {
    res.sendStatus(400);

    return;
  }

  next();
}

module.exports = {
  expensesMiddleware,
};
