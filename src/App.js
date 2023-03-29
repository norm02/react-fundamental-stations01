import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { NewThread } from "./components/NewThread.jsx";
import { Thread } from "./components/Thread.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thread/new" element={<NewThread />} />
          <Route path="/Thread" element={<Thread />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
