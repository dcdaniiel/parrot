exports.up = (knex) =>
  knex.schema.createTable('persons', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').references('users.id').notNullable();
    table.uuid('level_id').references('levels.id').notNullable();
    table.timestamps(true, true);
    table.timestamp('last_vacation').nullable();
    table.timestamp('last_promotion').nullable();
    table.timestamp('birthdate').notNullable();
    table.timestamp('start_work').notNullable();
    table.timestamp('end_work').nullable();
    table.string('name', 150).notNullable();
    table.integer('age').notNullable();
    table.string('phone', 20).notNullable();
    table.string('emergency_contact', 100).notNullable();
    table.string('ahead_card', 20).notNullable();
    table.string('current_project', 100).notNullable();
    table.string('person_email', 100).notNullable();
    table.string('fdte_email', 100).notNullable();
    table.string('bitbucket_account', 100).notNullable();
    table.boolean('kids').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('persons');
