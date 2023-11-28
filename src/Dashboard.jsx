import { useEffect, useState } from "react";
// import { Cards } from "./Cards";
import axios from "axios";

export const Dashboard = () => {

  const [activeElement, setActiveElement] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

  const cards = ["./vite.svg", "./test.png", "./vite.svg", "./test.png"];
  const changeActiveElement = (e, itemId) => {
    e.preventDefault();
    setActiveElement(itemId);
  };

  const previousCard = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? currentIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextCard = () => {
    const isFirstSlide = currentIndex === questions.length - 1;
    const newIndex = isFirstSlide ? currentIndex : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    axios.get("http://192.168.1.14:8000/api/question/").then((res) => {
      const response = res.data;
      setQuestions(response);
    });
  }, []);
  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleRenderRadioButtonCLick = (e, value, index) => {
    // do stuff idk
  }

  const RenderRadioButton = (props) => { 
   /*
    * desc: string
    * question: string
    * options: string[]
    * multiple: boolean
    */ 
    return (
      <div className="w-full flex-col mb-2">
        <label htmlFor={props.desc}> {props.question} </label>
        {props.options.map((value, index) => (
          <div>
            <input type="radio" name={props.desc} value={value} onClick={(e) => handleRenderRadioButtonCLick(e, value, index)}></input>
            <label htmlFor={`radio-${index}`}> {props.options[index]} </label>
          </div>
        ))}
      </div>
    )
  };

  const RenderTextArea = (props) => (
    <div className="w-full flex-col">
      <label htmlFor={props.desc}> {props.question} </label>
      <input type="input" className="h-12 rounded-md overflow-scroll"></input>
    </div>
  );
  

  return ( 
    <main className="[height:100%] [min-height:100vh] bg-gray3 py-7 px-10"> { /* [background-image:linear-gradient(300deg,theme(colors.tertiary)_40%,theme(colors.gray3)_40%)] */} 
      <nav className="flex justify-between items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="250 -150 100 700"
          >
            <path d="M 102.06 100.888 C 100.98 107.476 98.442 113.524 94.446 119.032 C 90.45 124.432 84.996 128.806 78.084 132.154 C 71.28 135.502 63.234 137.176 53.946 137.176 L 36.774 137.176 L 29.484 178 L 1.782 178 L 21.87 64.276 L 66.744 64.276 C 78.624 64.276 87.588 66.922 93.636 72.214 C 99.684 77.398 102.708 84.472 102.708 93.436 C 102.708 96.136 102.492 98.62 102.06 100.888 Z M 55.566 115.468 C 65.934 115.468 72.036 110.608 73.872 100.888 C 74.088 99.16 74.196 97.918 74.196 97.162 C 74.196 93.706 73.062 91.06 70.794 89.224 C 68.634 87.28 65.286 86.308 60.75 86.308 L 45.684 86.308 L 40.662 115.468 L 55.566 115.468 Z M 169.456 64.276 C 181.228 64.276 190.192 66.976 196.348 72.376 C 202.504 77.668 205.582 84.58 205.582 93.112 C 205.582 95.596 205.366 97.918 204.934 100.078 C 203.638 107.638 200.344 114.388 195.052 120.328 C 189.76 126.268 182.686 130.48 173.83 132.964 L 192.136 178 L 160.87 178 L 144.832 135.07 L 138.19 135.07 L 130.576 178 L 102.874 178 L 122.962 64.276 L 169.456 64.276 Z M 176.584 101.212 C 176.8 99.484 176.908 98.35 176.908 97.81 C 176.908 94.354 175.774 91.708 173.506 89.872 C 171.346 87.928 168.106 86.956 163.786 86.956 L 146.614 86.956 L 141.592 115.468 L 158.764 115.468 C 163.84 115.468 167.836 114.226 170.752 111.742 C 173.776 109.258 175.72 105.748 176.584 101.212 Z M 262.661 179.134 C 253.049 179.134 244.571 177.136 237.227 173.14 C 229.991 169.144 224.375 163.528 220.379 156.292 C 216.383 149.056 214.385 140.74 214.385 131.344 C 214.385 118.06 217.247 106.234 222.971 95.866 C 228.695 85.39 236.633 77.236 246.785 71.404 C 257.045 65.572 268.655 62.656 281.615 62.656 C 291.335 62.656 299.867 64.654 307.211 68.65 C 314.555 72.538 320.225 78.1 324.221 85.336 C 328.217 92.464 330.215 100.672 330.215 109.96 C 330.215 123.244 327.353 135.178 321.629 145.762 C 315.905 156.238 307.913 164.446 297.653 170.386 C 287.393 176.218 275.729 179.134 262.661 179.134 Z M 266.873 153.538 C 274.001 153.538 280.265 151.702 285.665 148.03 C 291.065 144.358 295.223 139.444 298.139 133.288 C 301.163 127.024 302.675 120.274 302.675 113.038 C 302.675 105.262 300.515 99.16 296.195 94.732 C 291.875 90.304 285.827 88.09 278.051 88.09 C 270.923 88.09 264.605 89.926 259.097 93.598 C 253.697 97.27 249.485 102.184 246.461 108.34 C 243.545 114.388 242.087 121.084 242.087 128.428 C 242.087 136.204 244.247 142.36 248.567 146.896 C 252.887 151.324 258.989 153.538 266.873 153.538 Z" />
            <path d="M 262.21 316.94 L 298.498 316.94 L 294.772 338 L 230.782 338 L 250.87 224.276 L 278.572 224.276 L 262.21 316.94 Z M 351.887 246.146 L 347.837 269.798 L 384.935 269.798 L 381.209 290.696 L 344.111 290.696 L 339.575 316.13 L 381.533 316.13 L 377.645 338 L 307.985 338 L 328.073 224.276 L 397.733 224.276 L 393.845 246.146 L 351.887 246.146 Z M 469.988 317.912 L 427.544 317.912 L 417.176 338 L 388.178 338 L 449.414 224.276 L 481.49 224.276 L 502.55 338 L 473.228 338 L 469.988 317.912 Z M 466.748 296.852 L 460.106 254.732 L 438.398 296.852 L 466.748 296.852 Z M 615.351 260.888 C 614.271 267.476 611.733 273.524 607.737 279.032 C 603.741 284.432 598.287 288.806 591.375 292.154 C 584.571 295.502 576.525 297.176 567.237 297.176 L 550.065 297.176 L 542.775 338 L 515.073 338 L 535.161 224.276 L 580.035 224.276 C 591.915 224.276 600.879 226.922 606.927 232.214 C 612.975 237.398 615.999 244.472 615.999 253.436 C 615.999 256.136 615.783 258.62 615.351 260.888 Z M 568.857 275.468 C 579.225 275.468 585.327 270.608 587.163 260.888 C 587.379 259.16 587.487 257.918 587.487 257.162 C 587.487 253.706 586.353 251.06 584.085 249.224 C 581.925 247.28 578.577 246.308 574.041 246.308 L 558.975 246.308 L 553.953 275.468 L 568.857 275.468 Z" />
          </svg>
        </div>
        <div className="nav-main flex justify-evenly align-middle w-64">
          <div
            className={
              activeElement == 0
                ? "border-b-2 border-b-primary2 cursor-pointer h-7 transition-colors duration-300 ease-in-out"
                : "cursor-pointer h-7"
            }
            onClick={(e) => setActiveElement(0)}
          >
            {" "}
            HOME{" "}
          </div>
          <div
            className={
              activeElement == 1
                ? "border-b-2 border-b-primary2 cursor-pointer h-7 transition-colors duration-300 ease-in-out"
                : "cursor-pointer h-7"
            }
            onClick={(e) => setActiveElement(1)}
          >
            {" "}
            UPDATES{" "}
          </div>
          <div
            className={
              activeElement == 2
                ? "border-b-2 border-b-primary2 cursor-pointer h-7 transition duration-300 ease-in-out"
                : "cursor-pointer h-7"
            }
            onClick={(e) => setActiveElement(2)}
          >
            {" "}
            TASKS{" "}
          </div>
        </div>
      </nav>
      {/* <div className="cards flex w-[40vw] mt-[3vh] ml-[3vw] h-[40vh]">
        <button onClick={previousCard} className="w-[10%]">
          PREV
        </button>
        <div>
          {/* {questions.length ? questions[currentIndex].q_desc : null} */}
          {/* {questions.length && questions[currentIndex].q_type === "TEXT" ? (
            <div>
              <label htmlFor="">{questions[currentIndex].q_text}</label>
              <input type="text" />
            </div>
          ): 
          questions.length &&
            questions[currentIndex].q_type === "RADIO" ? (
            <div>
              <label htmlFor="">{questions[currentIndex].q_text}</label>
              <input type="text" />
            </div>)
           : null}
        </div> */}
        {/* <img src={cards[currentIndex]} alt="" className="w-[90%] h-full"/> */}
        {/* {questions && 
              questions.map((val,index)=>(
                <div>
                  {val.q_type}
                </div>
              ))
            } */}
        {/* <button onClick={nextCard} className="w-[10%]">
          NEXT
        </button>
      </div> */} 

      <div className="card flex w-[35vw] min-w-[400px] h-[65vh] min-h-[650px] ms-24 mt-10 p-4 md:place-self-center border border-solid border-black">
        <form>
          <RenderRadioButton desc="getting age" question="What's your age?" options={[18, 19, 20, 21]}/>
          <RenderTextArea desc="kundi" question="unga toothpaste la uppu irukka?"/>
        </form>
      </div>
    </main>
  );
};

