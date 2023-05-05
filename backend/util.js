import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.String,
  contents: mongoose.SchemaTypes.String,
  commenterName: mongoose.SchemaTypes.String,
  replyToId: mongoose.SchemaTypes.String,
  thread_id: mongoose.SchemaTypes.String,
});

export const Comment = mongoose.model("Comment", commentSchema);

const threadSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.String,
  title: { type: mongoose.SchemaTypes.String, default: "Untitled" },
  contents: mongoose.SchemaTypes.String,
  poster: { type: mongoose.SchemaTypes.String, default: "Anonymous" },

  comments: [
    {
      type: mongoose.SchemaTypes.String,
      ref: "Comment",
    },
  ],

  image: {
    data: Buffer,
    contentType: String,
  },
});

export const Thread = mongoose.model("Thread", threadSchema);
