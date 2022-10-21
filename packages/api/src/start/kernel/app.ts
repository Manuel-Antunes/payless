/* eslint-disable no-console */
import http from 'http';

import Bodyparser from 'koa-bodyparser';

import cors from '@koa/cors';
import Koa from 'koa';
import logger from 'koa-logger';


import routes from '../routes';

class App {
  public app;
  public server;

  constructor() {
    this.app = new Koa();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.server = http.createServer(this.app.callback());
  }

  public middlewares() {
    this.app.use(logger());
    this.app.use(cors());
    this.app.use(Bodyparser());
  }

  public routes() {
    this.app.use(routes.routes());
  }

  public exceptionHandler() {
    this.app.use(exceptionHandler.handle);
    this.app.on('error', (err) => {
      console.log('app error: ', err);
    });
  }
}

export default new App();
