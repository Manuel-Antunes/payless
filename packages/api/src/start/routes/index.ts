import { graphqlConfig } from '@config/graphql';
import koaPlayground from 'graphql-playground-middleware-koa';
import { graphqlHTTP } from 'koa-graphql';
import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

router.post(
  '/graphql',
  graphqlHTTP(graphqlConfig),
);
router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
    // subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  }),
);

export default router;
