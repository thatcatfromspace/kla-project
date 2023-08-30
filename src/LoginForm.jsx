import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const onSubmit = (data) => {
  console.log(data);
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field."),
  password: yup.string().min(4).max(20).required("Password is a required field."),
});

export const LoginForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="login-back bg-slate-700 w-full h-screen justify-end min-h-64 flex">
      <form className="login-form rounded-lg shadow-lg min-h-[50vh] h-[50vh] py-3 px-3 w-64 my-52 bg-slate-200 me-20">
        <label className="flex justify-center pt-2 font-bold text-xl mb-6" htmlFor="continue-with"> Continue with </label>
        <div className="login-icons flex justify-evenly mx-14 mb-3">
          <Link to="https://github.com" target="_blank">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
            </svg>
          </Link>
          <Link to="https://google.com" target="_blank">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
            </svg>
          </Link>
        </div>
        <hr className="[background-color]" />
        <div className="flex flex-col px-2 pt-2 pb-4">
          <label className="pb-3 text-lg" htmlFor="email"> Email </label>
          <input type="email" className=" text-sm  bg-transparent px-2 shadow h-7 rounded focus:bg-slate-200 me-2" autoFocus={true} required {...register("email")} ></input>
        </div>
        <div className="flex flex-col px-2 pt-2 pb-4">
          <label className="pb-3 text-lg" htmlFor="password"> Password </label>
          <input type="password" className=" text-sm bg-transparent shadow px-2 h-7 rounded focus:bg-slate-200 me-2" required {...register("password")}></input>
        </div>
        <div className="flex justify-center py-5">
          <button type="submit" class="text-white bg-gradient-to-br from-blue-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2">Login</button>
        </div>
        {/* <div className="flex justify-center flex-col px-4">
          <button type="button" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
            
            Sign in with GitHub
          </button>
          <button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
            Sign in with Google
          </button>
        </div> */}
        <div className="flex justify-center pt-4">
        <p className="text-sm">New user? <Link className="text-blue-500 hover:underline visited:text-blue-500" to='/signup'> Sign up.</Link></p>
      </div>
      </form>
    </div>
  );
};
