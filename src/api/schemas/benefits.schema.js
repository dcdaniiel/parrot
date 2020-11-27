const yup = require('yup');

const benefitsCreate = yup.object().shape({
  person_id: yup.string().uuid(),
  month_init: yup.date().required(),
  month_end: yup.date().required(),
  value: yup.number({ precision: 2 }).required(),
  receipt: yup.string().required(),
  parcel: yup.number().required(),
});

module.exports = { benefitsCreate };
