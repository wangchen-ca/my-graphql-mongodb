// model/Authors.js
import mongoose from 'mongoose';

const Schema =  mongoose.Schema;

const authorSchema =  new Schema({
    name: String,
    gender: String,
    yob: Number,
});

export default mongoose.model('Author', authorSchema);