import { DefaultContext, DefaultState, Next, ParameterizedContext } from 'koa';

class ExceptionHandler {
  public async handle(
    ctx: ParameterizedContext<DefaultState, DefaultContext, any>,
    next: Next,
  ) {
    try {
      const response = await next();
      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  }
}

export default new ExceptionHandler();
