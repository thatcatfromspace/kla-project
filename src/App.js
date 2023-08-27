import './App.css';
import { LoginForm } from './pages/LoginForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from './pages/SignUpForm';

function App() {
  return (
  <div id="back-container" className="container min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <LoginForm />
    </Router>
  </div>
  );
}

export default App;
