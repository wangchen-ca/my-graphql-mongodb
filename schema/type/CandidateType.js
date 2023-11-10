// schema/type/BlogType.js

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLScalarType,
} from "graphql";


const CandidateType = new GraphQLObjectType({
  name: "Candidate",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

export default CandidateType ;
