exports.up = (knex) =>
  knex.schema.createTable('promotions', (table) => {
    table.uuid('id').primary();
    table
      .uuid('person_id')
      .references('persons.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .uuid('level_id')
      .references('levels.id')
      .nullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('date').nullable();
    table.float('value').notNullable();
    table.string('agreement', 255);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('promotions');
