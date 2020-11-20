exports.up = (knex) =>
  knex.schema.createTable('documents', (table) => {
    table.uuid('id').primary();
    table.uuid('person_id').references('persons.id').notNullable();
    table.string('type', 20).notNullable();
    table.string('number_doc').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('documents');
