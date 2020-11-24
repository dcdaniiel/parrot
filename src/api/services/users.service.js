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
  };
};
