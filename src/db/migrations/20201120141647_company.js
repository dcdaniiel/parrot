exports.up = (knex) =>
  knex.schema.createTable('companies', (table) => {
    table.uuid('id').primary();
    table.string('name', 150).notNullable().unique();
    table.string('cnpj', 20).unique().notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('companies');
