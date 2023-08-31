import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const onSubmit = (data) => {
  console.log(data);
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field."),
  password: yup.string().min(4).max(20).required("Password is a required field."),
  confirm: yup.string().min(4).max(20).oneOf([yup.ref("password"), null]).required()
});

export const SignupForm = () => {
  const [toggleValue, setValue] = useState(false);

  const toggleSetValue = () => {
    setValue(!toggleValue);
  };
    
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const RenderEye = () => {
    if (toggleValue){
      return (
        <svg className="relative top-2 left-56" width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      )
      }
    else return (
      <svg className="relative top-2 left-56" width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    )
  };  

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="signup-back w-full h-screen justify-start min-h-64 flex">
      <form className="signup-form py-3 px-3 w-64 my-52 ms-20 min-h-[450px]">
        <div className="flex flex-col px-2 pt-2 pb-4">
          <p className="text-2xl mb-5 font-bold text-center"> Welcome! </p>
          <fieldset>
            <legend><p className="text-lg mb-1"> Email </p></legend>
          </fieldset>
          <input type="email" className="text-md w-64 px-2 h-10 bg-gray2 rounded-md outline-none focus:outline-primary focus:border-0 me-2" autoFocus required {...register("email")} ></input>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4 mb-5">
          <fieldset>
            <legend><p className="text-lg mb-1"> Password </p></legend>
          </fieldset>
          <div>
            <input type={toggleValue? "text": "password"} id="password-input" className="text-md w-64 px-2 h-10 bg-gray2 rounded-md outline-none focus:outline-primary focus:border-0 me-2 absolute" required {...register("password")}></input>
            <Link onClick={toggleSetValue}>
              <RenderEye />
            </Link>
          </div>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4">
          <fieldset>
            <legend><p className="text-lg mb-1"> Confirm password </p></legend>
          </fieldset>  
          <div>
            <input type={toggleValue? "text": "password"} id="password-input" className="text-md w-64 px-2 h-10 bg-gray2 rounded-md outline-none focus:outline-primary focus:border-0 me-2 absolute" required {...register("repeatPassword")}></input>
            <Link onClick={toggleSetValue}>
              <RenderEye />
            </Link>
          </div>r      
        </div>
        <div className="flex justify-center py-5">
          <button type="submit" className="text-white bg-gradient-to-br from-gray0 to-gray1 hover:bg-gradient-to-bl focus:ring-4 outline-none focus:outline-none font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2">Sign Up</button>
        </div>
        <div className="flex justify-center pt-4">
        <p className="text-md"> Already have an account? <Link className="text-blue-500 hover:underline visited:text-blue-500" to='/'> Log in.</Link></p>
      </div>
      </form>
    </div>
  );
};
