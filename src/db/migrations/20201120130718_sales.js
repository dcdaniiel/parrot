exports.up = (knex) =>
  knex.schema.createTable('sales', (table) => {
    table.uuid('id').primary();
    table.uuid('level_id').references('levels.id').notNullable();
    table.float('price', 2).notNullable();
    table.float('cost', 2).notNullable();
    table.integer('margin').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('sales');
