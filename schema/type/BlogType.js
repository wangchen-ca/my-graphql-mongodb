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

import Blog from "../../model/Blog.js";

const DateType = new GraphQLScalarType({
  name: "Date",
  description: "ISO Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    console.log("ast :", ast);
    if (ast.kind === "StringValue") {
      return new Date(ast.value);
    }
    return null;
  },
});
const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    content: { type: GraphQLString },
    posted_at: {
      type: GraphQLString, 
      resolve(parent) {
        const date = parent.posted_at;
        if (date instanceof Date && !isNaN(date)) {
          return date.toISOString().split("T")[0];
        } else {
          return null; // Handle invalid dates gracefully
        }
      },
    },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args) {
        return Blog.find({ blogId: parent.id });
      },
    },
  }),
});

export { DateType, BlogType };
