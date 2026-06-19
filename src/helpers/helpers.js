// since the only body we can receive, I hardcode JSON parse to the function
const { MaxSizeError, NotJSON, RequestCancel } = require('../errors');
const maxSizeLimit = 1048576;

async function readBody(req, maxSize = maxSizeLimit) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    let settled = false;

    req.on('error', (err) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    });

    req.on('data', (chunk) => {
      if (settled) {
        return;
      }

      size += chunk.length;

      if (size > maxSize && !settled) {
        settled = true;
        req.destroy();
        reject(new MaxSizeError());

        return;
      }

      data += chunk;
    });

    req.on('end', () => {
      if (settled) {
        return;
      }

      try {
        settled = true;

        const res = JSON.parse(data);

        resolve(res);
      } catch {
        if (!settled) {
          settled = true;
          reject(new NotJSON());
        }
      }
    });

    req.on('close', () => {
      if (!settled) {
        settled = true;
        reject(new RequestCancel());
      }
    });
  });
}

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = { readBody, setCORS };
