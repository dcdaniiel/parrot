const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../core/models');

module.exports = () => {
  return {
    async get(id) {
      return { data: await User.fetch(id) };
    },
    async getAll() {
      const test = await User.getAll();
      console.log('TESTE:::', test);
      return { statusCode: 200, data: test };
    },
    async create(body) {
      const { role_id, email, password, kids_data, ...person } = body;

      const user = await new User(role_id, email, password);
      user.person_data = person;
      user.kids_data = kids_data;

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
          user.last_access = new Date();
          await user.save();

          return {
            data: {
              message: 'Successfully login!',
              token: jwt.sign(
                {
                  id: user._id,
                  type: user._role_id,
                },
                process.env.JWT_SECRET,
                { expiresIn: '6h' }
              ),
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
