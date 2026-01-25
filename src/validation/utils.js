const getValError = (statusCode, msg) => ({
  ok: false,
  statusCode: statusCode,
  message: msg,
});

module.exports = { getValError };
