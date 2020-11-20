exports.up = (knex) =>
  knex.schema.createTable('roles', (table) => {
    table.uuid('id').primary();
    table.string('name', 150).notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('roles');
