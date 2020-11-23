exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table
      .uuid('role_id')
      .references('roles.id')
      .nullable()
      .onDelete('SET NULL');
    table.string('email', 150).notNullable().unique();
    table.string('password', 100).notNullable();
    table.string('salt', 255).notNullable();
    table.string('status', 15).notNullable();
    table.timestamp('last_access');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('users');
