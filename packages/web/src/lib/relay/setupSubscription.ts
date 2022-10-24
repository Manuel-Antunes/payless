import { Observable, SubscribeFunction } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { environment } from '../../../env';
import { getToken } from '../../contexts/AuthContext';

export const setupSubscription: SubscribeFunction = (request, variables) => {
  const query = request.text;

  const authorization = getToken();

  const connectionParams: Record<string, string> = {};

  if (authorization) {
    connectionParams['authorization'] = authorization;
  }

  const subscriptionClient = new SubscriptionClient(environment.WS_API_URL, {
    reconnect: true,
    connectionParams,
  });

  const observable = subscriptionClient.request({ query: query!, variables });

  return Observable.from(observable as any);
};
