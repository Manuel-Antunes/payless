import { join } from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { defaultsDeep } from 'lodash';

function getValidators() {
  const validators = loadFilesSync(
    join(__dirname, '..', '..', 'modules', '**', '*.validators.*'),
    { extensions: ['js', 'ts'] },
  );
  return defaultsDeep({}, ...validators);
}

export const validatorsMiddleware = getValidators();
