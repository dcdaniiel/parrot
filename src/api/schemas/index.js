const { userCreate, userLogin } = require('./user.schema');
const { promotionCreate } = require('./promotion.schema');
const { benefitsCreate } = require('./benefits.schema');

const schemas = {
  userCreate,
  userLogin,
  promotionCreate,
  benefitsCreate,
};

const validateSchema = async (schema, obj) => {
  return schemas[schema].validate(obj);
};

module.exports = { validateSchema };
