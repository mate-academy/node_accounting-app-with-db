'use strict';

function notFound(req, res) {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.end();
}

module.exports = { notFound };
