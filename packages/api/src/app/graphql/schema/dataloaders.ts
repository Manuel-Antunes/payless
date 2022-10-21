import { join } from 'path';

import { defaultsDeep } from 'lodash';

import { GQLResolvers } from '@app/graphql/generated/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import Dataloader from 'dataloader';

export type GQLDataLoaders<T> = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof GQLResolvers]: Dataloader<string, T>;
};

export const getLoaders = () => {
  const loaders = loadFilesSync(
    join(__dirname, '..', '..', 'modules', '**', '*.loader.*'),
    { extensions: ['js', 'ts'] },
  );
  return defaultsDeep({}, ...loaders);
};
