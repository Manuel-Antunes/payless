import { RequestParameters, UploadableMap, Variables } from 'relay-runtime';

import { getToken } from '../../contexts/AuthContext';

import { getHeaders, getRequestBody, handleData, isMutation } from './helpers';

import { environment } from 'packages/web/env';

export const fetchQuery =
  (
    // eslint-disable-next-line @typescript-eslint/ban-types
    fetchFn: Function,
    upRequest?: {
      headers: Record<string, string>;
    },
  ) =>
  async (
    request: RequestParameters,
    variables: Variables,
    uploadables: UploadableMap | null | undefined,
  ) => {
    try {

      const body = getRequestBody(request, variables, uploadables);

      const authorization = getToken();

      const headers = {
        ...getHeaders(uploadables),
        authorization,
        ...upRequest?.headers,
      } as HeadersInit;

      // uncomment to see optimistic update working
      // const fetchFn = fetchWithRetries;

      const response = await fetchFn(environment.API_URL, {
        method: 'POST',
        headers,
        body,
      });

      const data = await handleData(response);

      if (response.status === 401) {
        throw data.errors;
      }

      if (isMutation(request) && data.errors) {
        throw data;
      }

      if (!data.data) {
        throw data.errors;
      }

      return data;
    } catch (err) {
      // eslint-disable-next-line
      console.log('err: ', err);

      const timeoutRegexp = new RegExp(/Still no successful response after/);
      const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
      if (
        timeoutRegexp.test((err as Error).message) ||
        serverUnavailableRegexp.test((err as Error).message)
      ) {
        throw new Error('Unavailable service. Try again later.');
      }

      throw err;
    }
  };
