import { useEffect, useState } from "react";
// import { Cards } from "./Cards";
import axios from "axios";
import { Cards } from "./Cards";
import { useNavigate } from "react-router-dom";
export const Dashboard = ({ uid, userName, isAuthenticated }) => {
  const [activeElement, setActiveElement] = useState(0);
  const isAuth = isAuthenticated;
  const userId = uid;
  const uName = userName;
  const navigate = useNavigate();
  const changeActiveElement = (e, itemId) => {
    e.preventDefault();
    setActiveElement(itemId);
  };

  const [currentCardId, setCurrentCardId] = useState();
  const [showActivity, setShowActivity] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [activity, setActivity] = useState([]);
  const [currentActivity, setCurrentActivity] = useState();
  useEffect(() => {
    axios
      .get(
        `http://${import.meta.env.VITE_API_URL}/api/recentactivity/user/${userId}/`
      )
      .then((res) => {
        let response = res.data;
        console.log(res.data);
        setActivity(response);
      });
  }, []);
  useEffect(() => {
    // setShowActivity(false);
    if (currentCardId != null) {
      console.log(currentCardId);
      setShowCard(true);
    }
  }, [setShowActivity, currentCardId, setCurrentCardId]);
  return isAuth === true ? (
    <main className="[height:100%] [min-height:100vh] bg-gray3 text-[30px] ">
      <nav className="flex justify-between z-10 bg-primary h-[10vh] top-0 w-full fixed text-gray3 items-center px-8">
        <div className="w-[75%] flex gap-5">
          <svg width="42" height="47" viewBox="0 0 42 47" fill="none">
            <path
              id="Vector"
              d="M37.1017 0.628425L37.7533 0.87452C38.4071 1.40659 38.6273 2.10084 38.3565 3.06091C38.0067 4.29723 37.7067 5.66097 37.4564 7.15214C37.326 7.93232 37.2648 8.61743 37.2727 9.20746C37.2883 10.8116 36.6666 13.4505 35.1967 14.2115C33.9278 14.8688 32.7661 15.3692 31.7118 15.7127C30.7873 16.0133 29.7701 16.0825 28.6603 15.9203C28.5563 15.9041 28.4668 15.9444 28.3917 16.0414C28.3549 16.0881 28.3291 16.14 28.3145 16.1972C28.287 16.2933 28.2381 16.3187 28.1678 16.2734C27.6097 15.9184 26.7895 15.709 26.202 16.3552C24.8771 17.804 23.8285 19.3311 23.0562 20.9364C22.3978 22.3048 21.6938 23.8335 20.944 25.5225C20.9116 25.5957 20.9032 25.6769 20.9205 25.7497C20.9378 25.8225 20.9794 25.8815 21.037 25.9149C21.1296 25.9708 21.2292 25.9917 21.3358 25.9776C23.5918 25.6827 29.5948 24.4493 30.7422 27.0135C31.78 29.3265 32.2188 31.9271 33.3371 34.1796C34.0522 35.6185 34.4163 37.2853 34.7723 38.9114C35.0162 40.022 36.2063 40.2239 37.1352 40.1454C38.1381 40.0583 39.1605 39.943 40.2022 39.7994C40.5229 39.7555 40.8274 39.7754 41.1156 39.8592C41.1602 39.872 41.2 39.8976 41.2315 39.9337C41.263 39.9698 41.2853 40.0153 41.2964 40.0663C41.3074 40.1172 41.307 40.172 41.295 40.2258C41.283 40.2796 41.2599 40.3308 41.2277 40.3747C39.8099 42.2962 37.539 43.4567 35.5368 44.5652C35.4309 44.6234 35.3437 44.7064 35.275 44.8142C34.8493 45.4901 34.3628 45.6605 33.7327 45.9615C33.5026 46.071 33.3344 46.0117 33.2283 45.7836C32.7778 44.8175 32.3822 44.1573 32.5277 43.0151C32.5406 42.9072 32.5062 42.8315 32.4247 42.7882L31.8087 42.4616C31.7348 42.4211 31.6831 42.3567 31.6536 42.2682C31.5321 41.9027 31.3941 41.4557 31.4261 41.0448C31.4695 40.495 31.349 40.0295 31.0647 39.6485C30.2364 38.5303 29.9924 37.0311 29.3482 35.738C28.6419 34.3222 27.9479 32.8714 27.2663 31.3855C27.1789 31.1958 27.1211 30.9902 27.093 30.7685C27.0867 30.7171 27.0658 30.6713 27.0333 30.6376C27.0008 30.6039 26.9583 30.5841 26.9121 30.5811C26.6179 30.564 26.3072 30.6253 25.98 30.765C23.9657 31.6234 21.958 32.2722 19.9568 32.7115C19.8714 32.7294 19.8206 32.7875 19.8045 32.8859C19.7432 33.2471 19.7032 33.6029 19.6846 33.9531C19.5733 36.0065 19.4255 38.0106 19.2413 39.9655C19.1539 40.8914 18.9382 41.7887 18.5944 42.6575C17.6255 45.112 15.7679 44.0187 14.5662 43.098C12.0172 41.1419 9.80347 38.4507 7.77934 35.806C7.35354 35.2535 7.2268 34.6102 6.53912 34.3693C6.46204 34.3431 6.39574 34.2913 6.34793 34.22C6.30013 34.1486 6.2728 34.0607 6.26913 33.9665C6.2478 33.5093 6.09199 33.1559 5.80173 32.9063C4.50034 31.7912 3.01711 30.7203 1.22548 30.6673C0.841701 30.656 0.530182 30.4997 0.290927 30.1984C0.223206 30.1119 0.189414 29.9957 0.196188 29.8724C0.202961 29.7491 0.24981 29.6278 0.327536 29.5322C1.073 28.6135 2.47956 28.3393 3.48137 28.1441C5.41595 27.7654 7.17924 27.5162 8.77123 27.3967C9.34704 27.353 9.60276 27.6825 9.53838 28.3852C9.40419 29.8513 8.95667 30.5503 9.95402 31.6791C10.9764 32.8319 11.9174 33.906 12.7773 34.9013C12.8031 34.9308 12.8367 34.9503 12.8741 34.9575C12.9114 34.9647 12.951 34.9594 12.9881 34.9421C13.0253 34.9248 13.0584 34.8963 13.0836 34.86C13.1088 34.8236 13.125 34.781 13.1304 34.737C13.2003 34.1722 13.104 33.6636 12.8413 33.2114C12.418 32.4811 12.003 31.7311 11.5963 30.9612C11.446 30.6788 11.3482 30.3755 11.3029 30.0513C10.9881 27.8579 11.0562 26.3794 12.0976 24.2813C12.7616 22.9443 13.3553 21.5943 13.8788 20.2314C15.0201 17.2508 16.1271 14.2781 17.1996 11.3132C17.2053 11.2976 17.2082 11.2811 17.2079 11.2649C17.2076 11.2487 17.2041 11.2332 17.1978 11.2195C17.1915 11.2058 17.1825 11.1942 17.1714 11.1855C17.1602 11.1768 17.1473 11.1712 17.1334 11.1692C16.4663 11.0844 15.793 11.1153 15.1136 11.2619C14.6912 11.3531 14.2573 11.3658 13.812 11.3C13.2089 11.2122 12.6002 11.2111 11.9859 11.2966C10.3726 11.5189 8.87407 11.6246 7.49033 11.6139C6.03517 11.6002 4.54998 12.2145 3.13751 12.6431C2.21573 12.9249 0.0633096 13.0428 1.00897 11.0872C1.36989 10.3398 1.82508 9.80551 2.37455 9.48446C2.45226 9.44068 2.52893 9.43204 2.60458 9.45851C3.17845 9.66061 3.753 9.88177 4.32821 10.122C4.60928 10.2386 4.94478 10.2504 5.33471 10.1574C5.79506 10.0492 6.22746 9.90852 6.63194 9.73535C8.68625 8.85445 10.9555 8.44121 13.4396 8.49562C13.7636 8.50308 14.3917 8.22843 15.3238 7.67166C16.2775 7.10421 17.4346 7.10874 18.4738 6.94651C20.5025 6.62841 22.3929 6.91509 24.145 7.80655C24.6993 8.088 25.2334 7.59713 25.5026 7.00935C26.5523 4.72955 27.6595 3.11698 29.9751 2.55308C31.606 2.15681 32.8869 4.74954 33.3724 6.26162C33.8224 7.66629 33.8382 9.08244 32.2409 9.79226C31.8006 9.98635 31.5703 10.3601 31.2575 10.7371C31.1788 10.8322 31.0803 10.9026 30.9737 10.9401C30.6211 11.0639 30.3796 11.2151 30.2492 11.3936C29.8815 11.9044 29.9714 12.0899 30.519 11.9498C31.4996 11.6997 32.482 11.586 33.4662 11.6088C33.5636 11.61 33.6438 11.5641 33.707 11.471C35.0131 9.54911 35.8539 7.45679 36.2296 5.19401C36.3184 4.66034 36.182 4.19519 35.8696 3.84218C35.1626 3.04868 34.226 1.4258 35.8992 0.813574C36.2851 0.671015 36.6859 0.609298 37.1017 0.628425Z"
              fill="#349959"
            />
          </svg>
          <span className="flex flex-col justify-center text-gray2 font-poppins text-[30px]  italic font-[700] ">
            PROLEAP
          </span>
        </div>
        <div className="nav-main flex justify-evenly align-middle w-[25%] text-[18.54px] ">
          <div
            className={
              activeElement == 0
                ? "border-b-2 border-b-primary2 cursor-pointer h-7 transition-colors duration-300 ease-in-out"
                : "cursor-pointer h-7 "
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
      <div className="mainarea flex mt-[10vh] relative z-1">
        <div className="sidebar w-[16.66%] flex flex-col  h-[90vh] fixed bg-primary border-t-2 border-primary2">
          <div className="flex justify-center my-12 ">
            <img
              src="./cat.jpg"
              alt=""
              className="w-[50%] max-w-[100px] rounded-[50%]"
            />
          </div>
          <div className="text-tertiary flex justify-center text-[18.54px] font-poppins">
            <span>{uName}</span>
          </div>
        </div>
        <div className="w-[50%] ml-[16.66%] p-8">
          {showActivity && (
            <ul className="flex flex-wrap justify-start  px-3">
              {activity.length != 0
                ? activity.map((val, index) => (
                    <button
                      onClick={(e) => {
                        setCurrentCardId(
                          val.card_ids.indexOf(val.current_card)
                        );
                        setCurrentActivity(val);
                        console.log(val.card_ids.indexOf(val.current_card));
                        setShowActivity(false);
                        // setShowCard(true);
                      }}
                      className="flex w-1/2 flex-col flex-wrap h-[20vh] shadow-md  hover:shadow-lg hover:shadow-primary p-8 "
                    >
                      <li key={index} className="">
                        <span className="text-[30px] justify-start flex">
                          {val.name}
                        </span>
                        <span className="text- justify-start text-[18.54px] flex">
                          {val.desc}
                        </span>
                      </li>
                    </button>
                  ))
                : null}
            </ul>
          )}
          {!showActivity && showCard && activeElement === 0 ? (
            <div className="h-fit flex justify-center text-[18.54px] ml-0 ">
              <Cards
                uid={userId}
                cid={currentCardId}
                Activity={currentActivity}
              />
            </div>
          ) : null}
        </div>
        <div className="w-[33.34%] flex-col relative p-8 text-[30px] ">
          <div className="h-fit shadow-2xl mb-8 p-4">
            <div>Stats</div>
            <span className="text-[18.54px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              quis nam mollitia quod natus laboriosam praesentium voluptatem
              eveniet repellendus culpa cum, non consequuntur temporibus! Facere
              iusto velit officiis voluptate iure. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Veniam, culpa.
            </span>
          </div>
          <div className="h-fit shadow-2xl p-4 ">
            <div>Deadlines</div>
            <span className="text-[18.54px] ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Veritatis illum distinctio temporibus minus illo explicabo itaque
              sit eius laudantium fugit libero, doloribus, accusamus quidem
              repellat quis iste quisquam minima quam? Sint aspernatur iste odio
              fugiat officia dignissimos, dolor assumenda optio pariatur
              temporibus cupiditate dolorum ea quasi totam nam qui eaque rerum
              earum, ullam modi consectetur obcaecati? Nostrum quis provident
              ducimus? Repellendus, cum! Blanditiis totam deserunt assumenda
              velit doloremque. recusandae.
            </span>
          </div>
        </div>
      </div>
    </main>
  ) : (
    navigate("/")
  );
};
