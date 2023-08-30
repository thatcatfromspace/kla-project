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
    <div onSubmit={handleSubmit(onSubmit)} className="login-back bg-gradient-to-tr from-blue-400 to-purple-300 w-full h-screen justify-start min-h-64 flex">
      <form className="login-form rounded-lg shadow-lg py-3 px-3 w-64 my-52 bg-slate-200 ms-20 min-h-[450px]">
        <div className="flex flex-col px-2 pt-2 pb-4">
          <label className="pb-3" htmlFor="email"> Email </label>
          <input type="email" className=" text-sm  bg-transparent px-2 shadow h-7 rounded focus:bg-slate-200 me-2" autoFocus={true} required {...register("email")} ></input>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4">
          <label className="pb-3" htmlFor="password"> Password </label>
          <input type="password" className=" text-sm bg-transparent shadow px-2 h-7 rounded focus:bg-slate-200 me-2" required {...register("password")}></input>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4">
          <label className="pb-3" htmlFor="confirm-password"> Confirm password </label>
          <input type="password" className=" text-sm bg-transparent shadow px-2 h-7 rounded focus:bg-slate-200 me-2" required {...register("confirm")}></input>
        </div>
        <div className="flex justify-center py-5">
          <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl transition-colors transition-delay-300 hover:transition-delay-0 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign in</button>
        </div>
        <div className="flex justify-center pt-4">
        <p className="text-sm"> Already have an account? <Link className="text-blue-500 hover:underline visited:text-blue-500" to='/'> Log in.</Link></p>
      </div>
      </form>
    </div>
  );
};
