// model/Books.js
import mongoose from 'mongoose';
const Schema =  mongoose.Schema;

const bookSchema =  new Schema({
    name: String,
    genre: String,
    // authorIds: [String]
    authorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
});

export default mongoose.model('Book', bookSchema);