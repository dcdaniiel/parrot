const bcryptjs = require('bcryptjs');
const { User } = require('../../core/models');

module.exports = () => {
  return {
    async get(id) {
      return { data: await User.fetch(id) };
    },
    async create(body) {
      const { role_id, email, password, ...person } = body;

      const user = await new User(role_id, email, password);
      user.personData = person;

      const { _id, _email, _created_at } = await user.save();

      return {
        data: {
          _id,
          _email,
          _name: person.name,
          _created_at,
        },
      };
    },
    async login(body) {
      const { email, password } = body;

      const user = await User.findBy({ email });

      if (user) {
        const { _salt, _password } = user;
        const givenPasswd = password + _salt;
        const password_is_valid = await bcryptjs.compare(
          givenPasswd,
          _password
        );

        if (password_is_valid) {
          return {
            data: {
              message: 'Successfully login!',
              jwt: '',
            },
            statusCode: 200,
          };
        }

        return {
          data: {
            message: `Password isn't valid!`,
          },
          statusCode: 401,
        };
      }

      return {
        data: {
          message: `Email ${email} not found!`,
        },
        statusCode: 404,
      };
    },
  };
};
