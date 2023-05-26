import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Test from "./main/Roadmap";
import Test2 from "./main/test2";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </Router>
  );
}

export default App;
