module.exports = {
  src: './src',
  schema: './src/graphql/schema.graphql',
  exclude: [
    '**/node_modules/**',
    '**/__generated__/**',
    '**/.next/**',
    '**/test/**',
  ],
  language: 'typescript',
};
