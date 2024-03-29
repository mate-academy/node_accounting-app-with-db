function validateUUID(id) {
  const reg =
    // eslint-disable-next-line max-len
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return reg.test(id);
}

module.exports = {
  validateUUID,
};
