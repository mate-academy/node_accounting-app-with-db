const errorMsg = {
  method: (mtd) => `Unexpected request method: ${mtd}`,
  endpoint: (pth) => `Expected endpoint to be /entity/id?, received: ${pth}`,
  entity: (entity) => `Unexpected entity: ${entity}`,
  wholeUrl: (path) => `Unknown path: ${path}`,
  bodyStructure: () => 'Invalid body structure',
  keys: (keys) => `Unexpected body keys in body: ${keys}`,
  valueType: (value, datatype) =>
    `Unexpected body values: ${value} expected to be of ${datatype} type`,
};

module.exports = { errorMsg };
