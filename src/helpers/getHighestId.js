function getHighestId(array) {
  return array.reduce(
    (acc, currentObject) => (currentObject.id > acc ? currentObject.id : acc),
    array[0]?.id || -1,
  );
}

module.exports = {
  getHighestId,
};
