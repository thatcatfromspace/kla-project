import { useState, useEffect } from "react";
import axios from "axios";
import { input } from "@material-tailwind/react";
export const Cards = ({ uid, cid, Activity }) => {
  console.log(cid);
  const [currentIndex, setCurrentIndex] = useState(cid);
  const [card, setCard] = useState([]);
  const [activity, setActivity] = useState(Activity);
  const [tempFlag, setTempFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState([
    {
      id: null,
      message: null,
      is_true: false,
    },
  ]);
  const userId = uid;
  const [questionsId, setQuestionId] = useState([]);
  const [requiredFlag, setRequiredFlag] = useState([]);

  const previousCard = (e) => {
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const required = requiredFlag.length === 0;
    // if (!required) {
    //   let temp = errorMessage;
    //   for (let i = 0; i < requiredFlag.length; i++) {
    //     for (let j = 0; j < temp.length; j++) {
    //       if (requiredFlag[i].id === temp[j].id) {
    //         temp[j].message = "Fill out this field";
    //         temp[j].is_true = true;
    //         setTempFlag(true);
    //       }
    //     }
    //   }
    //   setErrorMessage(temp);
    // }
    // } else {
    //   for (let i = 0; i < questionsId.length; i++) {
    //     if ("answer" in card.questions[i].question) {
    //       if (card.questions[i].question.q_type === "RADIO") {
    //         let obj = {
    //           question: card.questions[i].question.id,
    //           answer: "",
    //           user: userId,
    //           option: card.questions[i].question.answer.id,
    //           activity:activity.id,
    //           card:card.id,
    //         };
    //         axios.post("http://${import.meta.env.VITE_API_URL}/api/answer/", obj).then((res) => {
    //           console.log(res.data);
    //         });
    //       } else {
    //         let obj = {
    //           question: card.questions[i].question.id,
    //           answer: card.questions[i].question.answer,
    //           user: userId,
    //           option: "",
    //           activity:activity.id,
    //           card:card.id,
    //         };
    //         axios.post("http://{import.meta.env.VITE_API_URL}/api/answer/", obj).then((res) => {
    //           console.log(res.data);
    //         });
    //       }
    //     }
    //   }
    // }

    const newIndex = isFirstSlide ? currentIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const getCardDetails = (aid, cid) => {
    setCard([]);
    setRequiredFlag([]);
    setErrorMessage([]);
    axios
      .get(
        `http://${import.meta.env.VITE_API_URL}/api/activity/${aid}/card/${cid}/user/${userId}`
      )
      .then((res) => {
        const response = res.data;
        console.log(response);
        setCard(response);
        setQuestionId(response.question);
        const respons = res.data.questions;
        const tempArray = [];
        for (let i = 0; i < respons.length; i++) {
          let errorObj = {
            id: respons[i].question.id,
            message: "",
            is_true: false,
          };
          if (
            respons[i].question.is_required === true &&
            respons[i].answer.length === 0
          ) {
            let obj = {
              id: respons[i].question.id,
            };
            setRequiredFlag((prev) => [...prev, obj]);
          }
          setErrorMessage((prev) => [...prev, errorObj]);
        }
      });
  };

  const nextCard = (e) => {
    e.preventDefault();
    let len = activity.card_ids.length;
    const isLastSlide = currentIndex === len - 1;
    const required = requiredFlag.length === 0;
    if (!required) {
      let temp = errorMessage;
      for (let i = 0; i < requiredFlag.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          if (requiredFlag[i].id === temp[j].id) {
            temp[j].message = "Fill out this field";
            setTempFlag(true);
          }
        }
      }
      console.log(temp);
      setErrorMessage(temp);
    } else {
      for (let i = 0; i < questionsId.length; i++) {
        console.log(card.questions[i]);
        if ("answer" in card.questions[i].question) {
          if (card.questions[i].question.type === "RADIO") {
            let obj = {
              question: card.questions[i].question.id,
              answer: "",
              user: userId,
              option: card.questions[i].question.answer.id,
              activity: activity.id,
              card: card.id,
            };
            console.log(obj);

            axios
              .post(`http://${import.meta.env.VITE_API_URL}/api/answer/`, obj)
              .then((res) => {
                // console.log(res.data);
              });
          } else if (
            card.questions[i].question.type === "TEXT" ||
            card.questions[i].question.type === "SHORT_ANSWER" ||
            card.questions[i].question.type === "DATE"
          ) {
            let obj = {
              question: card.questions[i].question.id,
              answer: card.questions[i].question.answer,
              user: userId,
              option: "",
              activity: activity.id,
              card: card.id,
            };
            console.log(obj);
            axios
              .post(`http://${import.meta.env.VITE_API_URL}/api/answer/`, obj)
              .then((res) => {
                // console.log(res.data);
              });
          } else {
            let obj = {
              question: card.questions[i].question.id,
              answer: null,
              user: userId,
              option: null,
              activity: activity.id,
              card: card.id,
            };
            console.log(obj);
            axios
              .post(`http://${import.meta.env.VITE_API_URL}/api/answer/`, obj)
              .then((res) => {
                // console.log(res.data);
              });
          }
        }
      }
      // console.log("HELLO" + required);
    }
    const newIndex = isLastSlide
      ? currentIndex
      : required
      ? currentIndex + 1
      : currentIndex;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (activity != null) {
      if (currentIndex < activity.card_ids.length) {
        getCardDetails(activity.id, activity.card_ids[currentIndex]);
      }
    }
  }, [currentIndex]);
  return (
    <div className="cards w-full flex justify-evenly align-middle bg-primary  border-2 text-gray1 border-black py-3">
      <button
        onClick={(e) => previousCard(e)}
        className="h-fit relative top-[45%]  hover:border-2 rounded-[50%] p-1 hover:bg-gray1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={
            currentIndex === 0
              ? "gray"
              : requiredFlag.length === 0
              ? "#349959"
              : "gray"
          }
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-left hover:stroke-tertiary"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>{" "}
        {/* make stroke color gray if going to previous is disabled! */}
      </button>
      <ul className="flex flex-col  ">
        <div className="w- h-[10%] bg-primary text-tertiary p-3">
          {activity != null ? activity.name : null}
        </div>
        {card.questions &&
          card.questions.map((val, index) => (
            <li
              className="none h-full w-[100%] border-t-2 border-primary"
              key={index}
            >
              {val.question.type === "TEXT" ||
              val.question.type === "SHORT_ANSWER" ? (
                // <RenderTextArea desc={val.question.q_desc} question={val} textAnswer={textAnswer} setTestAnswer={setTestAnswer}/>
                <div className="w-full flex flex-col flex-grow flex-shrink-0 basis-full mb-2 p-2  rounded-lg  [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label className="mb-2" htmlFor={val.question.desc}>
                    {" "}
                    {val.question.text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`box-border  break-words outline-none ${
                      val.question.q_type === "SHORT_ANSWER" ? "" : "w-1/2"
                    } py-2 text-sm bg-transparent rounded-sm border-b-2 border-b-tertiary/70 focus:border-b-[2.5px] focus:border-b-blue-500 ease-in overflow-scroll`}
                    // onBlur={() => monitorEmptyText(required)}
                    defaultValue={
                      val.answer.length != 0 ? val.answer[0].answer : ""
                    }
                    disabled={val.answer.length != 0 ? true : false}
                    onChange={(e) => {
                      val.question.answer = e.target.value;
                      console.log(val.question);
                      const new_state = requiredFlag.filter(
                        (obj) => obj.id != val.question.id
                      );
                      setRequiredFlag(new_state);
                    }}
                  ></input>

                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-secondary">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              ) : val.question.type === "RADIO" ||
                val.question.type === "MULTIPLE_CHOICE" ? (
                // <RenderRadioButton
                //   desc={val.question.q_desc}
                //   question={val.question.q_text}
                //   options={radioOptions[index]}
                // />
                <div className="w-full flex flex-col flex-grow flex-shrink-0 basis-full mb-2 p-2  rounded-lg  [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label htmlFor={val.question.desc}>
                    {" "}
                    {val.question.text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  {val.answer.length === 0 ? (
                    val.question.options.map((value, index) => (
                      <div className="" key={index}>
                        <input
                          className="before:content[''] peer relative w-3 h-3 mr-2 cursor-pointer appearance-none rounded-full border border-blue-200 border-5 hover:bg-gray1/70 focus:bg-tertiary checked:bg-tertiary checked:border-0 active:bg-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4  before:transition-opacity  hover:before:opacity-5"
                          type="radio"
                          name={val.question.desc}
                          // value={value}
                          // onChange={(e) =>
                          //   handleRenderRadioButtonCLick(val, value)
                          // }
                          // checked
                          checked={
                            val.answer.length != 0
                              ? value.id === val.answer[0].id
                                ? true
                                : false
                              : false
                          }
                          disabled={val.answer.length != 0 ? true : false}
                          onChange={(e) => {
                            val.question.answer = value;
                            console.log(val.question);
                            const new_state = requiredFlag.filter(
                              (obj) => obj.id != val.question.id
                            );
                            setRequiredFlag(new_state);
                          }}
                          id={`radio-${index}`}
                        ></input>

                        <label htmlFor={`radio-${index}`}>
                          {" "}
                          {value.value}{" "}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="">
                      <input
                        className="before:content[''] peer relative w-3 h-3 mr-2 cursor-pointer appearance-none rounded-full border border-blue-200 border-5 hover:bg-gray1/70 focus:bg-tertiary checked:bg-tertiary checked:border-0 active:bg-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4  before:transition-opacity  hover:before:opacity-5"
                        type="radio"
                        name={val.question.desc}
                        checked
                        disabled
                        id={`radio-${index}`}
                      ></input>
                      {/* <label htmlFor={`radio-${index}`} key={index}>
                        {val.answer[0].}
                      </label> */}
                      {val.question.options.map((value, index) => (
                        <label htmlFor={`radio-${index}`} key={index}>
                          {value.id === val.answer[0].option
                            ? value.value
                            : null}
                        </label>
                      ))}
                    </div>
                  )}

                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-secondary">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span> </span>
                  )}
                </div>
              ) : val.question.type === "EMAIL" ? (
                // <RenderEmailArea
                //   desc={val.question.q_desc}
                //   question={val.question.q_text}
                //   options={radioOptions[index]}
                // />
                <div className="w-full flex flex-col flex-grow flex-shrink-0 basis-full mb-2 p-2   [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label className="mb-2" htmlFor={val.question.desc}>
                    {" "}
                    {val.question.text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  <input
                    type="email"
                    className={`box-border break-words outline-none ${"w-1/2"} py-2 text-sm bg-transparent rounded-sm border-b-2 border-b-tertiary/70 focus:border-b-[2.5px] focus:border-b-blue-500 ease-in overflow-scroll`}
                    // onBlur={() => monitorEmptyText(required)}
                    // value={(e)=>{e.target.value}}
                    onChange={(e) => {
                      val.question.answer = e.target.value;
                      console.log(val.question);
                      const new_state = requiredFlag.filter(
                        (obj) => obj.id != val.question.id
                      );
                      setRequiredFlag(new_state);
                    }}
                    defaultValue={
                      val.answer.length != 0 ? val.answer[0].answer : ""
                    }
                    disabled={val.answer.length != 0 ? true : false}
                    // required
                  ></input>
                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-secondary">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              ) : val.question.type === "DATE" ? (
                // <RenderDateArea
                //   desc={val.question.q_desc}
                //   question={val.question.q_text}
                //   options={radioOptions[index]}
                // />
                <div className="w-full flex flex-col flex-grow flex-shrink-0 bg-transparent basis-full mb-2 p-2 rounded-lg [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label className="mb-2" htmlFor={val.question.desc}>
                    {" "}
                    {val.question.text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  <input
                    type="date"
                    className={`box-border break-words outline-none py-2 text-sm bg-transparent rounded-sm  `}
                    // onBlur={() => monitorEmptyText(required)}
                    // value={(e)=>{e.target.value}}
                    onChange={(e) => {
                      val.question.answer = e.target.value;
                      console.log(val.question);
                      const new_state = requiredFlag.filter(
                        (obj) => obj.id != val.question.id
                      );
                      setRequiredFlag(new_state);
                    }}
                    defaultValue={
                      val.answer.length != 0 ? val.answer[0].answer : ""
                    }
                    disabled={val.answer.length != 0 ? true : false}
                    // required
                  ></input>
                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-secondary">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              ) : null}{" "}
            </li>
          ))}
      </ul>
      <button
        onClick={(e) => nextCard(e)}
        className=" h-fit relative top-[45%]  hover:border-2 rounded-[50%] p-1 border-gray1 hover:bg-gray1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={
            currentIndex === activity && activity.cards.length - 1
              ? "gray"
              : false || requiredFlag.length === 0
              ? "#349959"
              : "gray"
          }
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
};
