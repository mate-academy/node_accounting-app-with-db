const { contentTypes } = require('../static/vocab');

function errorHandler(error, res) {
  const statusCode = error.statusCode;

  res.setHeader('Content-Type', contentTypes.json);

  if (!statusCode) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Unexpected server error' }));

    return;
  }

  res.statusCode = statusCode;
  res.end(JSON.stringify({ error: error.message }));
}

module.exports = { errorHandler };
