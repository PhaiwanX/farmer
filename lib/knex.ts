import Knex from 'knex';

const knexConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'farmer',
    charset: 'utf8' // Specify charset here

  },
};

const knex = Knex(knexConfig);

export default knex;
