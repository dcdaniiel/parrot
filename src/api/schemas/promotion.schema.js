const yup = require('yup');

const promotionCreate = yup.object().shape({
  person_id: yup.string().uuid(),
  level_id: yup.string().uuid(),
  date: yup.date().required(),
  value: yup.number({ precision: 2 }).required(),
  agreement: yup.string(),
});

module.exports = { promotionCreate };
