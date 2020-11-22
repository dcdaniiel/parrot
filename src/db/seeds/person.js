const { Level, Role, Person, User } = require('../../core/models');

const user_fn = (role_id, email, passwd) =>
  User.serialize(new User(role_id, email, passwd));
const role_fn = (name) => Role.serialize(new Role(name));
const level_fn = (name, salary, benefit_value) =>
  Level.serialize(new Level(name, salary, benefit_value));

exports.seed = async (knex) => {
  const role_data = await knex('roles').insert(role_fn('ADMIN'), 'id');
  const level_data = await knex('levels').insert(
    level_fn('A3', 6400, 230),
    'id'
  );
  const user = await knex('users').insert(
    user_fn(role_data.id, 'email@email.com', 'passwd'),
    'id'
  );

  const person_data = new Person(
    user[0],
    level_data[0],
    'Name test',
    new Date(),
    20
  );

  person_data.last_vacation = new Date();
  person_data.last_promotion = new Date();
  person_data.start_work = new Date();
  person_data.end_work = new Date();
  person_data.phone = '11111111111';
  person_data.emergency_contact = '11111111111';
  person_data.ahead_card = 'AHEAD CARD';
  person_data.current_project = 'FL';
  person_data.person_email = 'mail@com';
  person_data.fdte_email = 'mail@fdte.io';
  person_data.bitbucket_account = 'bitbucket@com';
  person_data.kids = false;

  await knex('persons').insert(Person.serialize(person_data));
};
