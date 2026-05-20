/**
 * Scalar: undefined, null, or ''.
 * Arrays: length 0.
 * Plain objects: no own keys (e.g. {}).
 */
function isPlainObject(value) {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || proto === null;
}

function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * True when `payload` has content.
 * - Array: not isEmpty (so [] fails) and every item non-empty. Note:
 *   [].every(...) is always true in JS, so the isEmpty(payload) guard matters.
 * - Non-array: not isEmpty() (plain {} counts as empty).
 */
function isValid(payload) {
  if (Array.isArray(payload)) {
    return !isEmpty(payload) && payload.every((v) => !isEmpty(v));
  }

  return !isEmpty(payload);
}

/**
 * Plain object and every key in `keys` is own-property and not isEmpty().
 */
function hasRequiredNonEmptyFields(obj, keys) {
  if (
    obj === null ||
    obj === undefined ||
    typeof obj !== 'object' ||
    Array.isArray(obj)
  ) {
    return false;
  }

  return keys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj, key) && !isEmpty(obj[key]),
  );
}

module.exports = {
  hasRequiredNonEmptyFields,
  isEmpty,
  isValid,
};
