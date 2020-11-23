const yup = require('yup');

const userSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  role_id: yup.string().uuid(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  salt: yup.string().required(),
  status: yup.string().required(),
  last_access: yup.date().required(),
});

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
});

module.exports = { userSchema, userCreate };
