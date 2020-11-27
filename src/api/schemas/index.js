const { userCreate, userLogin } = require('./user.schema');
const { promotionCreate } = require('./promotion.schema');

const schemas = {
  userCreate,
  userLogin,
  promotionCreate,
};

const validateSchema = async (schema, obj) => {
  return schemas[schema].validate(obj);
};

module.exports = { validateSchema };
