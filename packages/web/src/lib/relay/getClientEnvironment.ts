// lib/client_environment.ts
import { getRelaySerializedState } from 'relay-nextjs';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { cacheHandler } from './cacheHandler';
import { setupSubscription } from './setupSubscription';

export function createClientNetwork() {
  return Network.create(cacheHandler(fetch), setupSubscription);
}

let clientEnv: Environment | undefined;
export function getClientEnvironment() {
  if (typeof window === 'undefined') return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records), {
        gcReleaseBufferSize: 10,
      }),
      isServer: false,
    });
  }
  return clientEnv;
}
