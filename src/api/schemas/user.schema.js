const yup = require('yup');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userCreate = yup.object().shape({
  role_id: yup.string().uuid(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, 'at least 8 chars')
    .matches(/[a-z]/, 'at least one lowercase char')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      'at least 1 number or special char (@,!,#, etc).'
    )
    .required(),
  name: yup.string().required(),
  level_id: yup.string().uuid().required(),
  birthdate: yup.date().required(),
  age: yup.number().required(),
  last_vacation: yup.date().required(),
  last_promotion: yup.date().required(),
  start_work: yup.date().required(),
  end_work: yup.date(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid'),
  emergency_contact: yup
    .string()
    .matches(phoneRegExp, 'Emergency contact number is not valid')
    .required(),
  ahead_card: yup.string(),
  current_project: yup.string().required(),
  person_email: yup.string().email().required().required(),
  fdte_email: yup.string().email().required(),
  bitbucket_account: yup.string().required(),
  kids: yup.bool().required(),
});

const userLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

module.exports = { userCreate, userLogin };
