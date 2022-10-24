import { NextApiRequest, NextPageContext } from 'next';

export type ApiContext =
  | Pick<NextPageContext, 'req'>
  | {
      req: NextApiRequest;
    }
  | null
