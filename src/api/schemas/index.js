const { userCreate, userLogin } = require('./user.schema');
const { promotionCreate } = require('./promotion.schema');
const { benefitsCreate } = require('./benefits.schema');
const { docCreate } = require('./docs.schema');

const schemas = {
  userCreate,
  userLogin,
  promotionCreate,
  benefitsCreate,
  docCreate,
};

const validateSchema = async (schema, obj) => {
  return schemas[schema].validate(obj);
};

module.exports = { validateSchema };
