//schema/type/BookType.js
import Book from "../../model/Book.js";
import AuthorType from './AuthorType.js';
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args, context) {
        console.log('Resolve function for authors field is executed'); // Add this line for logging
        return Book.findById(parent._id)
          .populate("authorIds")
          .then((book) => {
            console.log('Book document found:', book); // Add this line for logging
            return book.authorIds;
          })
          .catch((error) => {
            console.error('Error in resolve function:', error); // Add this line for logging
          });
      },
    },
  }),
});

export default BookType;
