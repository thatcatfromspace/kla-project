import { useForm } from "react-hook-form";
import logo from '../assets/PL_Color.png'
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import '../App.css';

    
  const onSubmit = (data) => {
    console.log(data);
  };

  const schema = yup.object().shape({
    email: yup
    .string()
    .email()
    .required(),
    password: yup
    .string()
    .required(),
  });

  export const Form = () => {
    const { register, handleSubmit } = useForm({ // passing schema for validation
      resolver: yupResolver(schema)
    });

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div id="loginForm" className="container flex-column shadow border rounded justify-content-center p-4">
        <h5 className="display-5 mt-3 text-center" id="top-welcome">Welcome</h5>
        <div id="icon-container" className="d-flex justify-content-center mt-3 mb-5">
          <img src={logo} height="50px" alt='proleap-logo'/>
        </div>
        <div className="container d-flex flex-column ms-2 me-2 mb-4">
          <label htmlFor="user-email" className="text-dark-emphasis fs-6 mb-1 text-start content-label" aria-label="email">Email</label>
          <input className="form-control border-0 input-group-text text-dark" type="email" id="email-input" autoFocus={true} required {...register('email')}></input>
          <hr className="mt-0"/>
        </div>
        <div className="container d-flex flex-column ms-2 me-2">
          <label htmlFor="password" className="text-dark-emphasis fs-6 mb-1 text-start content-label" aria-label="password">Password</label>
          <input className="border-0 form-control input-group-text text-dark text-start" type="password" id="password-input" required {...register('password')}></input>
          <hr className="mt-0" id="rule"/>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn border rounded-pill px-3 pt-2 pb-2" type="submit" id="submit-button">Submit</button>
        </div>
        <div className="d-flex justify-content-center pt-4">
          <p id="signup-text"> New user? <a href="https://google.com"> Sign up.</a></p>
        </div>
      </div>
    </form>
  );
}