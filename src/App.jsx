import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { NotFound } from "./PageNotFound";
import { Dashboard } from "./Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
