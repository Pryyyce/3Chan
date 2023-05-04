
import './App.css';
// using React Router
import { Thread } from "./Thread.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingScreen } from "./LandingScreen.js";
import { Threads } from "./Threads.js";
import { NewThread,NewComment,NewReply } from "./newThread.js";
function App() {
  return (
    <>
    <div>
   <BrowserRouter >
      <Routes>
        <Route path="/" element={<LandingScreen />}  >
            <Route path="newThread" element={<NewThread />} />
        </Route>
        <Route path="/threads" element={<Threads />} />
        <Route path="/threads/:threadId" element={<Thread />} >
            <Route path="newComment" element={<NewComment />} />
            <Route path="comments/:commentId/reply" element={<NewReply />} />
        </Route>
        
      </Routes>
   </BrowserRouter>
   </div>
   </>
  );
}

export default App;
