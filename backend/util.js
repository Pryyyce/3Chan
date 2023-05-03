import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';




const commentSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.String,
  contents: mongoose.SchemaTypes.String,
  commenterName: mongoose.SchemaTypes.String,
  thread_id: mongoose.SchemaTypes.String,
  replyToId: mongoose.SchemaTypes.String
});

export const Comment = mongoose.model('Comment', commentSchema);

const threadSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.String,
  title: mongoose.SchemaTypes.String,
  contents: mongoose.SchemaTypes.String,
  
  comments: [{
    type: mongoose.SchemaTypes.String,
    ref: 'Comment'
  }]
});

export const Thread = mongoose.model('Thread', threadSchema);