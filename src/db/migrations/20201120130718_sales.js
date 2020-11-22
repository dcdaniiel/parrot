exports.up = (knex) =>
  knex.schema.createTable('sales', (table) => {
    table.uuid('id').primary();
    table
      .uuid('level_id')
      .references('levels.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    table.float('price', 2).notNullable();
    table.float('cost', 2).notNullable();
    table.float('margin', 5).notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('sales');
