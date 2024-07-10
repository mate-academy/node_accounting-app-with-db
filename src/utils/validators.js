module.exports.isValidId = (id) => Boolean(id && !isNaN(+id));

module.exports.isValidString = (name) =>
  Boolean(typeof name === 'string' && name.trim().length && name.length <= 255);

module.exports.isValidDate = (date) =>
  Boolean(date.toString() !== 'Invalid Date');
