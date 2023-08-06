import './App.css';
import logo from './assets/PL_Color.png'

function App() {
  return (
  <div id="back-container" class="container min-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
    <form>
      <div id="loginForm" class="container flex-column shadow border rounded justify-content-center p-4">
        <h5 class="display-5 mt-3 text-center" id="top-welcome">Welcome</h5>
        <div id="icon-container" class="d-flex justify-content-center mt-3 mb-5">
          <img src={logo} height="50px" alt='proleap-logo'/>
        </div>
        <div class="container d-flex flex-column ms-2 me-2 mb-4">
          <label for="user-email" class="text-dark-emphasis fs-6 mb-1 text-start content-label" aria-label="email">Email</label>
          <input class="form-control border-0 input-group-text text-dark" type="email" id="email-input" autofocus="true" required></input>
          <hr class="mt-0"/>
        </div>
        <div class="container d-flex flex-column ms-2 me-2">
          <label for="password" class="text-dark-emphasis fs-6 mb-1 text-start content-label" aria-label="password">Password</label>
          <input class="border-0 form-control input-group-text text-dark text-start" type="password" id="password-input" required></input>
          <hr class="mt-0" id="rule"/>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button class="btn border rounded-pill px-3 pt-2 pb-2" type="submit" id="submit-button" onclick="formValidate()">Submit</button>
        </div>
      </div>
    </form>  
  </div>
  );
}

export default App;
