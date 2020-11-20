const { join } = require('path');

const BASE_PATH = join(__dirname, 'src/db');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST || '0.0.0.0',
      port: process.env.PG_PORT || '5432',
      database: process.env.PG_DATABASE || 'rh-database',
      user: process.env.PG_USER || 'docker',
      password: process.env.PG_PASSWD || 'docker',
    },
    migrations: {
      directory: join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: join(BASE_PATH, 'seeds'),
    },
  },
};
