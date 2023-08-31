import Lottie from "lottie-react";
import notFound from "./assets/notFound.json";

export const NotFound = () => (
  <div className="flex flex-col self-center items-center justify-center w-1/4 h-1/4">
    <Lottie animationData={notFound} loop={true}/>
    <p className="text-lg text-center"> {"The page you requested could not be found :("} </p>
  </div>
);