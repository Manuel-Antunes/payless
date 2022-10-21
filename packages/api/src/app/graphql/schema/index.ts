import { join } from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';

import { middlewares } from '../middleware';

function getResolvers() {
  const resolversArray = loadFilesSync(
    join(__dirname, '..', '..', 'modules/**/*.resolver.*s'),
  );
  return mergeResolvers(resolversArray);
}

function getTypes() {
  const typesArray = loadFilesSync(join(__dirname, '../../modules/**/*.graphql'));
  return mergeTypeDefs(typesArray);
}

function createSchema() {
  const typeDefs = getTypes();
  const resolvers = getResolvers();
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return applyMiddleware(executableSchema, ...middlewares);
}

export const schema = createSchema();
