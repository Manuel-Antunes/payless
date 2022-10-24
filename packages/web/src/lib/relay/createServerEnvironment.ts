import nodeFetch from 'node-fetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { ApiContext } from '../../@types/ApiContext';
import { getToken } from '../../contexts/AuthContext';

import { cacheHandler } from './cacheHandler';


export function createServerNetwork(ctx: ApiContext) {
  const authorization = getToken(ctx);
  return Network.create(
    cacheHandler(nodeFetch, {
      headers: {
        authorization,
      },
    }),
  );
}

export function createServerEnvironment(ctx: ApiContext) {
  return new Environment({
    network: createServerNetwork(ctx),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
