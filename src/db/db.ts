import knex, { Knex } from 'knex';
import { getEnv } from '../utils/env';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: getEnv('DB_HOST'),
    port: parseInt(getEnv('DB_PORT')),
    user: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
  },
  // debug: true,
};

const db = knex(config);

// Set parser for numeric type
// pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number); // This could be a problem if we number is too big??

export default db;
