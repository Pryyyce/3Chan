import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import ThreadRouter from './Threads.js';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
// Connect to the MongoDB database once and attach the connection pool to the application instance
await mongoose.connect('mongodb://localhost/stores', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  family: 4
})

app.get("/", (req, res) => {
  console.log(req, res);
  res.json({
    code: 200,
    message: "Hello, Express",
  });
});

app.use('/Threads', ThreadRouter);

app.listen(port, () => {
  console.log(`listening on localhost:${port}...`);
})
