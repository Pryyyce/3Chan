
import './App.css';
// using React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingScreen } from "./LandingScreen.js";
function App() {
  return (
    <>
    <div>
   <BrowserRouter >
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        
      </Routes>
   </BrowserRouter>
   </div>
   </>
  );
}

export default App;
