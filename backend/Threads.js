import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Thread } from "./util.js";
import commentRouter from "./Comment.js";

// multer setup (why in this file??? cause multer is gay(er than me even))
import multer from "multer";
// multer options to parse image files and store them in memory
const storage = multer.memoryStorage();
const uploader = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }});

const ThreadRouter = Router();

//Get /threads
ThreadRouter.get("/", async (req, res) => {
  const threads = await Thread.find();
  res.send(threads);
});

// Get /threads/:thread_id
ThreadRouter.get("/:thread_id", async (req, res) => {
  const thread_id = req.params.thread_id;
  try {
    const thread = await Thread.findOne({ _id: thread_id });
    //console.log(thread);
    if (thread === null) {
      res.status(404);
      res.json({
        status: 404,
        message: "Error: thread not found",
      });
      return;
    }
    res.json(thread);
  } catch (event) {
    //console.log(event);
    res.status(500);
    res.send("Error: Internal server error");
  }
});
// Delete is not needed, but why not include it?
ThreadRouter.delete("/:thread_id", async (req, res) => {
  const thread_id = req.params.thread_id;
  try {
    await Thread.deleteOne({ _id: thread_id });
    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
});
// POST /threads (now with new and improved file-upload middleware!!)
ThreadRouter.post("/", uploader.single("file"), async (req, res) => {
  // "single" middleware function above expects a single file upload

  const requestBody = req.body;
  requestBody._id = uuidv4();
  requestBody.comments = [];
  // stuff to hold uploaded image
  if (req.file) {
    // only read data if an image was sent
    requestBody.data = req.file.buffer;
    requestBody.contentType = req.file.mimetype;
  } else {
    requestBody.data = undefined;
    requestBody.contentType = "image/png";
  }

  console.log(req.file);

  try {
    const thread = await new Thread(requestBody).save();
    console.log(thread);
    res.status(201);
    res.json({
      status: 201,
      message: "Created new thread!",
    });
  } catch (event) {
    console.log(event);
    res.status(500);
    res.json({
      status: 500,
      message: event,
    });
  }
});
commentRouter.mergeParams = true;
ThreadRouter.use("/:thread_id/comments", commentRouter);
export default ThreadRouter;
