import { MongoClient } from "mongodb";
import mongoose, { mongo } from "mongoose";

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

  random: { type: mongoose.SchemaTypes.String, default: "This is a test" },

  // this is dumb and stupid and dumb wowee
  data: mongoose.SchemaTypes.Buffer,
  contentType: mongoose.SchemaTypes.String,
});

export const Thread = mongoose.model("Thread", threadSchema);
