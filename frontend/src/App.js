
import './App.css';
// using React Router
import { Thread, NewComment,} from "./Thread.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingScreen } from "./LandingScreen.js";
import { Threads } from "./Threads.js";
import { NewThread,NewReply } from "./newThread.js";
import { useState } from "react";
function App() {
  const [called,setCalled] = useState(false);
  const [comments, setComments] = useState([]); // [comment, setComment
  const handleCS = (comment) => {
    setCalled(!called);
  }
  return (
    <>
    <div>
   <BrowserRouter >
      <Routes>
        <Route path="/" element={<LandingScreen />}  >
            <Route path="newThread" element={<NewThread />} />
        </Route>
        <Route path="/threads" element={<Threads />} />
        <Route
              path="/threads/:threadId"
              actuator={called}
              element={<Thread comments = {comments} setComments = {setComments}/>}
            >
            <Route path="newComment" handleCS={handleCS} element={<NewComment comments = {comments} setComments = {setComments} />} />
            <Route path="comments/:commentId/reply" element={<NewReply comments = {comments} setComments = {setComments}/>} />
        </Route>
        
      </Routes>
   </BrowserRouter>
   </div>
   </>
  );
}

export default App;
