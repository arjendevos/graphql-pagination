import { ApolloServer } from 'apollo-server';
import { schema } from './modules';
import { context } from './context';
import { formatError } from './utils';

const port = process.env.PORT || 5000;

new ApolloServer({ schema, context, formatError }).listen({ port }, () => {
  return console.log(`Server ready at http://localhost:${port}`);
});
