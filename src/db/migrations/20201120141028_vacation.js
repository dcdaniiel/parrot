exports.up = (knex) =>
  knex.schema.createTable('vacations', (table) => {
    table.uuid('id').primary();
    table
      .uuid('person_id')
      .references('persons.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('year', 5).notNullable();
    table.timestamp('date_start').notNullable();
    table.timestamp('date_end').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('vacations');
