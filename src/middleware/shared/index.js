const { validateParamId } = require('./validateParamId');
const {
  checkIfEntityExistsByParamId,
} = require('./checkIfEntityExistsByParamId');
const {
  checkIfEntityExistsByBodyFieldId,
} = require('./checkIfEntityExistsByBodyFieldId');
const {
  checkIfEntityExistsByOptionalBodyFieldId,
} = require('./checkIfEntityExistsByOptionalBodyFieldId');

module.exports = {
  validateParamId,
  checkIfEntityExistsByParamId,
  checkIfEntityExistsByBodyFieldId,
  checkIfEntityExistsByOptionalBodyFieldId,
};
