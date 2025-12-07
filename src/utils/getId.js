const { v4: uuidv4, validate: uuidValidate } = require('uuid');

/**
 * Generates a random ID. By default, this returns a random number,
 * but if you ever want to switch to UUID, just uncomment the `uuidv4()` line.
 *
 * It wasn't required, but i added this ability, because why not? 😎
 *
 *
 * @returns {number|string} A random number or a UUID (if switched to).
 */
const getId = () => {
  return Math.floor(Math.random() * 10000000);
  // return uuidv4();
};

/**
 * Parses the ID, returning it if valid (UUID or number), otherwise `null`.
 *
 * @param {string|any} id - The ID to parse.
 * @returns {string|number|null} Parsed ID or `null` if invalid.
 */
const parseId = (id) => {
  if (typeof id === 'string' && uuidValidate(id)) {
    return id;
  }

  const num = Number(id);

  return isNaN(num) ? null : num;
};

module.exports = { getId, parseId };
