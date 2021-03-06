exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table
      .uuid('role_id')
      .references('roles.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('email', 150).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('salt', 255).unique().notNullable();
    table.string('status', 15).notNullable();
    table.timestamp('last_access');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('users');
