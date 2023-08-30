import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { Link } from "react-router-dom";

const onSubmit = (data) => {
  console.log(data);
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field."),
  password: yup.string().min(4).max(20).required("Password is a required field."),
  confirm: yup.string().min(4).max(20).oneOf([yup.ref("password"), null]).required()
});

export const SignupForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="signup-back w-full h-screen justify-start min-h-64 flex">
      <form className="signup-form py-3 px-3 w-64 my-52 ms-20 min-h-[450px]">
        <div className="flex flex-col px-2 pt-2 pb-4">
          <p className="text-2xl mb-5 font-bold text-center"> Welcome! </p>
          <fieldset>
            <legend><p className="text-lg mb-1"> Email </p></legend>
          </fieldset>
          <input type="email" className="text-sm px-2 h-10 bg-gray2 rounded-md outline-none focus:outline-primary focus:border-0 me-2" autoFocus={true} required {...register("email")} ></input>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4">
          <fieldset>
            <legend><p className="text-lg mb-1"> Password </p></legend>
          </fieldset>
          <input type="password" className="text-sm px-2 h-10 bg-gray2 rounded-md outline-none focus:outline-primary focus:border-0 me-2" required {...register("password")}></input>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4">
          <fieldset>
            <legend><p className="text-lg mb-1"> Confirm password </p></legend>
          </fieldset>        
          <input type="password" className="text-sm px-2 h-10 bg-gray2 rounded-md outline-none focus:outline-primary focus:border-0 me-2" required {...register("confirm")}></input>
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
