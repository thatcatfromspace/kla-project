import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { NotFound } from "./PageNotFound";
import { Dashboard } from "./Dashboard";
// import { Cards } from "./Cards";
import {DirectPolling} from "./DirectPolling";

const App = () => {
  const [userId,setUserId] = useState(5);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard uid = {userId}/>} />
        {/* <Route path="/cards" element={<Cards />} /> */}
        <Route path="/polls" element={<DirectPolling />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
