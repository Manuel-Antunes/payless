import { GQLDataLoaders } from '@app/graphql/schema/dataloaders';
import Dataloader from 'dataloader';

import { createLoader } from '@entria/graphql-mongo-helpers';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';

import { IUser } from './user.interface';

import { UserModel } from './user.model';

// eslint-disable-next-line no-unused-vars
const loaders: GQLDataLoaders<IUser | undefined> = {
  User: new Dataloader(async (ids: readonly string[]) =>
    mongooseLoader(UserModel, ids),
  ),
};

const {
  Wrapper: User,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: UserModel,
  loaderName: 'User',
});

export { getLoader, clearCache, load, loadAll, User };

export default loaders;
