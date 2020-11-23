const { User } = require('../../core/models');

module.exports = function UserService() {
  return {
    async get(id) {
      return { data: await User.fetch(id) };
    },
    async create(body) {
      const { role_id, email, password, ...person } = body;

      const user = await new User(role_id, email, password);
      user.personData = person;
      user.save();

      return { data: 'User created successfully!' };
    },
  };
};
