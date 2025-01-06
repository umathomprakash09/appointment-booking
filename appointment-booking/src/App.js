import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import SlotsForm from "./components/SlotsForm";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/slots" element={<SlotsForm />} />
    </Routes>
  </Router>
);

export default App;
