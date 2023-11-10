//schema/mutation/RootMutationType.js
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import AuthorType from "../type/AuthorType.js";
import BookType from "../type/BookType.js";
import { DateType, BlogType } from "../type/BlogType.js";
import CandidateType from "../type/CandidateType.js";

// Import your Mongoose model
import Author from "../../model/Author.js";
import Book from "../../model/Book.js";
import Blog from "../../model/Blog.js";
import Candidate from "../../model/Candidate.js";

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        yob: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          gender: args.gender,
          yob: args.yob,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorIds: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        // Create a new book and associate it with the specified authors
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorIds: args.authorIds,
        });

        // Save the book to the database
        return book.save();
      },
    },
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLString },
        image: { type: GraphQLString },
        status: { type: GraphQLBoolean },
        content: { type: GraphQLString },
        posted_at: { type: DateType },
      },
      resolve(parent, args) {
        let blog = new Blog({
          title: args.title,
          image: args.image,
          status: args.status,
          content: args.content,
          posted_at: args.posted_at,
        });
        return blog.save();
      },
    },

    addCandidate: {
      type: CandidateType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
      },
      resolve(parent, args) {
        let candidate = new Candidate({
          name: args.name,
          type: args.type,
        });
        return candidate.save();
      },
    },
  },
});

export default RootMutation;
