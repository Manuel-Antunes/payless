import databaseConfig from '@config/database';
import Koa from 'koa';
import mongoose from 'mongoose';

class DatabaseProvider {
  public app: Koa<Koa.DefaultState, Koa.DefaultContext>;

  register(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
    this.app = app;
    mongoose.connect(databaseConfig.url, databaseConfig.options);
  }
}

export default new DatabaseProvider();
