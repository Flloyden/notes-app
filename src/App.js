import './App.css';
import Notes from './components/Notes';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App min-h-screen font-sans">
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
