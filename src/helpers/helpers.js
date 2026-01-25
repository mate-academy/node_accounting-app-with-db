// since the only body we can receive, I hardcode JSON parse to the function

async function readBody(req, maxSize = 1048576) {
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
        reject(new Error('Request body too large'));

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
          reject(new Error('Invalid JSON'));
        }
      }
    });

    req.on('close', () => {
      if (!settled) {
        settled = true;
        reject(new Error('Request cancelled'));
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
