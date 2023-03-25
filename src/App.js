import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { NewThread } from "./components/NewThread.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/NewThread" element={<NewThread />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
