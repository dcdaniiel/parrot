const yup = require('yup');

const docCreate = yup.object().shape({
  person_id: yup.string().uuid(),
  type: yup.string().required(),
  number_doc: yup.string().required(),
});

module.exports = { docCreate };
