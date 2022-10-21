import { Middleware } from 'koa';

export interface AppMiddleware {
  handle: Middleware;
}
