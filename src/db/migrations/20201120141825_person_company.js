exports.up = (knex) =>
  knex.schema.createTable('person_companies', (table) => {
    table.uuid('id').primary();
    table.uuid('person_id').references('persons.id').notNullable();
    table.uuid('company_id').references('companies.id').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('person_companies');
