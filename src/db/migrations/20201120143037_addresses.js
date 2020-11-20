exports.up = (knex) =>
  knex.schema.createTable('addresses', (table) => {
    table.uuid('id').primary();
    table.uuid('person_id').references('persons.id').notNullable();
    table.string('street', 150).notNullable();
    table.integer('number', 5).notNullable();
    table.string('country', 50).notNullable();
    table.string('state', 50).notNullable();
    table.string('city', 50).notNullable();
    table.string('district', 50).notNullable();
    table.string('complement', 150).notNullable();
    table.string('cep', 20).notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('addresses');
