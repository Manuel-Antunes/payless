import path from 'path';

import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const ENV = process.env;

export const environment = {
  NODE_ENV: ENV.NODE_ENV,
  MONGO_URI: ENV.MONGO_URI,
  PORT: ENV.PORT || 3333,
  JWT_SECRET: ENV.JWT_KEY,
};
