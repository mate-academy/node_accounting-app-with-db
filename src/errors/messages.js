const errorMsg = {
  method: (mtd) => `Unexpected request method: ${mtd}`,
  endpoint: (pth) => `Expected endpoint to be /entity/id?, received: ${pth}`,
  entity: (entity) => `Unexpected entity: ${entity}`,
  wholeUrl: (path) => `Unknown path: ${path}`,
  bodyStructure: () => 'Invalid body structure',
  keys: (keys) => `Unexpected body keys in body: ${keys}`,
  valueType: (value, datatype) =>
    `Unexpected body values: ${value} expected to be of ${datatype} type`,
  noBody: () => 'Expected a body',
  noObligateFields: (missingFields) =>
    `Missing required fields: ${missingFields}`,
};

module.exports = { errorMsg };
