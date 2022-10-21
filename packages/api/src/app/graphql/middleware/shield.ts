import { join } from 'path';

import { shield } from 'graphql-shield';
import { defaultsDeep } from 'lodash';

import createError from 'http-errors';

import { loadFilesSync } from '@graphql-tools/load-files';


function getRuleTree() {
  const rules = loadFilesSync(
    join(__dirname, '..', '..', 'modules', '**', '*.shield.*'),
    { extensions: ['js', 'ts'] },
  );
  return defaultsDeep({}, ...rules);
}

export const shieldMiddleware = shield(getRuleTree(), {
  fallbackError: createError(500, 'Internal server error!'),
  debug: process.env.NODE_ENV !== 'production',
});
