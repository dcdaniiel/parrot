const { User } = require('../../core/models');

module.exports = function UserService() {
  return {
    async get(id) {
      return { data: await User.fetch(id) };
    },
    async create(body) {
      const { role_id, email, password } = body;

      // eslint-disable-next-line no-unused-vars
      const { _password, _salt, ...data } = await new User(
        role_id,
        email,
        password
      ).save();

      return { data };
    },
  };
};
