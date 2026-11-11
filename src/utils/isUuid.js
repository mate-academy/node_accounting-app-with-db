'use strict';

const uuidPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

const isUuid = (value) => uuidPattern.test(String(value));

module.exports = { isUuid };
