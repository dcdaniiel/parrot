exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.uuid('role_id').references('roles.id').nullable();
    table.string('email', 150).notNullable();
    table.string('password', 100).notNullable();
    table.timestamp('last_access');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('users');
