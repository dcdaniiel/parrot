exports.up = (knex) =>
  knex.schema.createTable('kids', (table) => {
    table.uuid('id').primary();
    table.uuid('person_id').references('persons.id').notNullable();
    table.string('name', 150).notNullable();
    table.timestamp('birthdate').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('kids');
