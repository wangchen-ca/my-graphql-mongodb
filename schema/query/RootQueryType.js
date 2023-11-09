//schema/query/RootQueryType.js

// Import your Mongoose model
import Author from "../../model/Author.js";
import Book from "../../model/Book.js";
import Blog from "../../model/Blog.js";

import AuthorType from "../type/AuthorType.js";
import BookType from "../type/BookType.js";
import { DateType, BlogType }  from "../type/BlogType.js";

import { GraphQLObjectType, GraphQLList, GraphQLID } from "graphql";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Implement a resolver function to fetch a single author by ID
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // Implement a resolver function to fetch all authors
        return Author.find({});
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Implement a resolver function to fetch a single book by ID
        return Book.findById(args.id).populate("authors").exec();
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // Use Mongoose's populate method to populate the authors field
        return Book.find({}).populate("authors").exec();
      },
    },
    blog: {
      type: BlogType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Blog.findById(args.id);
      },
    },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args) {
        return Blog.find({});
      },
    },
  },
});

export default RootQuery;
