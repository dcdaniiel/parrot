exports.up = (knex) =>
  knex.schema.createTable('levels', (table) => {
    table.uuid('id').primary();
    table.string('name', 150).notNullable();
    table.float('salary', 2).notNullable();
    table.float('benefit_value', 2).notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('levels');
