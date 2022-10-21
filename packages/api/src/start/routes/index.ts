import { schema } from '@app/graphql/schema';
import { getContext } from '@app/graphql/schema/context';
import { environment } from 'env';
import { GraphQLError } from 'graphql';
import koaPlayground from 'graphql-playground-middleware-koa';
import { graphqlHTTP } from 'koa-graphql';
import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});


export default router;
