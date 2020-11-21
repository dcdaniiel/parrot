exports.up = (knex) =>
  knex.schema.createTable('benefits', (table) => {
    table.uuid('id').primary();
    table
      .uuid('person_id')
      .references('persons.id')
      .nullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('month_init').notNullable();
    table.timestamp('month_end').notNullable();
    table.float('value').notNullable();
    table.integer('parcel');
    table.string('receipt', 255);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('benefits');
