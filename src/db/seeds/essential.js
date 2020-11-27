const { Role, Level } = require('../../core/models');

const role_data = (name) => Role.serialize(new Role(name));
const level_data = (name, salary, benefit_value) =>
  Level.serialize(new Level(name, salary, benefit_value));

exports.seed = async (knex) => {
  const verify_exists = await knex('roles').select('*');

  if (!verify_exists.length) {
    const admin = role_data('admin');
    const employee = role_data('employee');

    await knex('roles').insert([admin, employee]);

    const A1 = level_data('A1', 4500, 215);
    const A2 = level_data('A2', 5500, 215);
    const A3 = level_data('A3', 6430, 215);

    const B1 = level_data('B1', 8000, 400);
    const B2 = level_data('B2', 9000, 400);
    const B3 = level_data('B3', 10000, 400);
    const B4 = level_data('B4', 11000, 400);

    const C1 = level_data('C1', 12000, 800);
    const C2 = level_data('C2', 13000, 800);
    const C3 = level_data('C3', 14000, 800);
    const C4 = level_data('C4', 15000, 800);
    const C5 = level_data('C5', 16000, 800);

    await knex('levels').insert([
      A1,
      A2,
      A3,
      B1,
      B2,
      B3,
      B4,
      C1,
      C2,
      C3,
      C4,
      C5,
    ]);
  }
};
