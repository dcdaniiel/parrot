const { User, Role } = require('../../core/main');
const { PersistorProvider } = require('../../core/persist/_provider');

const user = (role_id, email, passwd) =>
  User.serialize(new User(role_id, email, passwd));

exports.seed = async (knex) => {
  const persistor = PersistorProvider.getPersistor();
  const Role = persistor.getPersistInstance('Role');

  const role = await Role.getAll();

  await knex('users').insert(user(role[0].id, 'email@asd.com', 'passwd'));
  await knex('users').insert(user(role[1].id, 'email@com', 'passwd'));
};
