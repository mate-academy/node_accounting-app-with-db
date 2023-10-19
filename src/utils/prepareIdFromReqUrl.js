'use strict';

function prepareIdFromReqUrl(req) {
  return Number(req.url.slice(1));
}

module.exports = {
  prepareIdFromReqUrl,
};
