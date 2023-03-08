import "./App.css";
import AudioPlayer from "./AudioPlayer";
import Form from "./Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/audio" element={<AudioPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
