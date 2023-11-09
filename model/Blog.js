// model/Blog.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  image: String,
  status: Boolean,
  content: String,
  posted_at: Date,
});

// Add a pre-save middleware to format the date before saving
blogSchema.pre("save", function (next) {
  if (this.posted_at) {
    if (typeof this.posted_at === "string") {
      // Parse the date if it's a string in the format "YYYY-MM-DD" or "YYYY/MM/DD"
      this.posted_at = new Date(this.posted_at.replace(/-/g, "/"));
    }
  }
  next();
});

export default mongoose.model("Blog", blogSchema);
