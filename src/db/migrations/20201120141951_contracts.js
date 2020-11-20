exports.up = (knex) =>
  knex.schema.createTable('contracts', (table) => {
    table.uuid('id').primary();
    table.uuid('company_id').references('companies.id').notNullable();
    table.timestamp('date_start').notNullable();
    table.timestamp('date_end').notNullable();
    table.string('name', 150).notNullable();
    table.string('description', 150);
    table.float('salary', 2);
    table.string('agreement', 150);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('contracts');
