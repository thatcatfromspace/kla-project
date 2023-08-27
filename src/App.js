import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './assets/PL_Color.png'
import { Dashboard } from './pages/Dashboard';

function App() {
  const [email, validateEmail] = useState("");
  const [password, validatePassword] = useState("");

  const setEmail = (e) => {
    validateEmail(e.target.value);
  }
   
  const setPassword = (e) => {
    validatePassword(e.target.value);
  }

  const validate = () => {
    if (email === "22pt09@psgtech.ac.in" && password === 'root'){
      window.open('localhost:3000/dashboard')?.focus();
    }
    else alert("Wrong creds bitch");
  }

  return (
    <div id="back-container" className="container min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
    <form>
      <div id="loginForm" className="container flex-column shadow border rounded justify-content-center p-4">
        <h5 className="display-5 mt-3 text-center" id="top-welcome">Welcome</h5>
        <div id="icon-container" className="d-flex justify-content-center mt-3 mb-5">
          <img src={logo} height="50px" alt='proleap-logo'/>
        </div>
        <div className="container d-flex flex-column ms-2 me-2 mb-4">
          <label htmlFor="user-email" className="text-dark-emphasis fs-6 mb-1 text-start content-label" aria-label="email">Email</label>
          <input className="form-control border-0 input-group-text text-dark" type="email" id="email-input" onChange={setEmail} autoFocus={true} required></input>
          <hr className="mt-0"/>
        </div>
        <div className="container d-flex flex-column ms-2 me-2">
          <label htmlFor="password" className="text-dark-emphasis fs-6 mb-1 text-start content-label" aria-label="password">Password</label>
          <input className="border-0 form-control input-group-text text-dark text-start" type="password" id="password-input" onChange={setPassword} required></input>
          <hr className="mt-0" id="rule"/>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn border rounded-pill px-3 pt-2 pb-2" type="button" id="submit-button" onClick={validate}>Submit</button>
        </div>
      </div>
    </form>  
  </div>
  );
}

export default App;
