// model/Candidate.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: String,
  type: String,
});


export default mongoose.model("Candidate", candidateSchema);
