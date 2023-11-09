//schema/type/AuthorType.js
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    _id: { type: GraphQLID }, 
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    yob: { type: GraphQLInt },
  }),
});

export default AuthorType;
