exports.up = (knex) =>
  knex.schema.createTable('banking_accounts', (table) => {
    table.uuid('id').primary();
    table.uuid('person_id').references('persons.id').notNullable();
    table.string('bank', 100).notNullable();
    table.string('bank_code', 20).notNullable();
    table.string('agency', 20).notNullable();
    table.string('account', 20).notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('banking_accounts');
