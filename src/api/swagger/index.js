const { ui, validate } = require('swagger2-koa');
const swagger = require('swagger2');

const api = swagger.loadDocumentSync(`${__dirname}/api.yaml`);

module.exports = {
  ui: ui(api, '/docs'),
  validate: validate(api),
};
