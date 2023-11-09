import { GraphQLSchema } from 'graphql';
import RootQuery from './query/RootQueryType.js';
import RootMutation from './mutation/RootMutationType.js';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
