import { FetchFunction, QueryResponseCache } from 'relay-runtime';

import { fetchQuery } from './fetchQuery';
import { forceFetch, isMutation, isQuery } from './helpers';

const oneMinute = 60 * 1000;
const queryResponseCache = new QueryResponseCache({
  size: 250,
  ttl: oneMinute,
});

export const cacheHandler = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchFn: Function,
  upRequest?:
    | {
        headers: Record<string, string>;
      }
    | undefined,
): FetchFunction => {
  return async (request, variables, cacheConfig, uploadables) => {
    const queryID = request.text;
    if (isMutation(request)) {
      queryResponseCache.clear();
      return fetchQuery(fetchFn, upRequest)(request, variables, uploadables);
    }

    const fromCache = queryResponseCache.get(queryID!, variables);
    if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
      return fromCache;
    }

    const fromServer = await fetchQuery(fetchFn, upRequest)(
      request,
      variables,
      uploadables,
    );
    if (fromServer) {
      queryResponseCache.set(queryID!, variables, fromServer);
    }

    return fromServer;
  };
};
