import { Router, request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Thread,Comment } from './util.js';


const commentRouter = Router();

// GET /threads/:thread_id/comments
commentRouter.get('/', async (req, res) => {
  const thread_id = req.params.thread_id;
  try {
    const thread = await Thread.findById(thread_id).populate('comments');
    console.log(thread);
    if (thread === null) {
      res.status(404);
      res.json({
        status: 404,
        message: 'no comments found!',
      });
      return;
    }
    res.json(thread.comments); // Return the items array
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send('Error: Internal server error');
  }
});

// GET threads/:thread_id/comments/:comment_id
commentRouter.get('/:comment_id', async (req, res) => {
  const thread_id = req.params.thread_id;
  const comment_id = req.params.comment_id;
  try {
    const thread = await Thread.findById(thread_id).populate('comments');
    if (thread === null) {
      res.status(404);
      res.json({
        status: 404,
        message: 'comment(s) not found',
      });
      return;
    }
    const comment = thread.comments.find((comment) => comment._id === comment_id);
    console.log(comment);
    if (comment === undefined) {
      res.status(404);
      res.json({
        status: 404,
        message: 'comment not found',
      });
      return;
    }
    res.json(comment); // Return the comments array
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send('Error: Internal server error');
  }
});
//Get /threads/:thread_id/comments/:comment_id/reply
commentRouter.get('/:comment_id/reply', async (req, res) => {
  const thread_id = req.params.thread_id;
  const comment_id = req.params.comment_id;
  try {
    const thread = await Thread.findById(thread_id).populate('comments');
    if (thread === null) {
      res.status(404);
      res.json({
        status: 404,
        message: 'comment(s) not found',
      });
      return;
    }
    const comment = thread.comments.find((comment) => comment.replyToId === comment_id);
    console.log(comment);
    if (comment === undefined) {
      res.status(404);
      res.json({
        status: 404,
        message: 'comment not found',
      });
      return;
    }
    res.json(comment); // Return the comments array
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send('Error: Internal server error');
  }
});




// POST /threads/:thread_id/comments
commentRouter.post("/", async (req, res) => {
  const requestBody = req.body;
  const thread_id = req.params.thread_id;
  
  requestBody._id = requestBody._id;
  requestBody.thread_id = thread_id;
  requestBody.contents = requestBody.contents;
  requestBody.commenterName = requestBody.commenterName; // Limit to 2 decimal places, great for prices
  requestBody.replyToId = requestBody.replyToId;

  try {
    const comment = await new Comment(requestBody).save(); // comment needs to be saved to the comments collection
    const thread_comment = await Thread.updateOne({ _id: thread_id }, { $push: { comments: requestBody } }); // Add comment to store's comments array

    console.log(comment);
    res.status(201);
    res.json({
      status: 201,
      message: 'Created new comment',
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      status: 500,
      message: e,
    });
  }
})


export default commentRouter;
