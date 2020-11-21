const { Role } = require('../../core/main');

const role = (name) => Role.serialize(new Role(name));

exports.seed = async (knex) => {
  await knex('users').del();
  await knex('roles').del();
  await knex('roles').insert(role('admin'));
  await knex('roles').insert(role('employee'));
};
