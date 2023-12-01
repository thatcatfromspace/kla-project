import { useState, useEffect } from "react";
import axios from "axios";
export const Cards = (uid) => {
  const [currentIndex, setCurrentIndex] = useState();
  const [card, setCard] = useState([]);
  const [activity, setActivity] = useState([]);
  const [tempFlag, setTempFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState([
    {
      id: null,
      message: null,
      is_true: false,
    },
  ]);
  const userId = uid.uid;
  const [questionsId, setQuestionId] = useState([]);
  const [requiredFlag, setRequiredFlag] = useState([]);

  const previousCard = (e) => {
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const required = requiredFlag.length === 0;
    if (!required) {
      let temp = errorMessage;
      for (let i = 0; i < requiredFlag.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          if (requiredFlag[i].id === temp[j].id) {
            temp[j].message = "Fill out this field";
            temp[j].is_true = true;
            setTempFlag(true);
          }
        }
      }
      setErrorMessage(temp);
    } else {
      for (let i = 0; i < questionsId.length; i++) {
        if ("answer" in card.questions[i].question) {
          if (card.questions[i].question.q_type === "RADIO") {
            let obj = {
              question: card.questions[i].question.id,
              answer: "",
              user: userId,
              option: card.questions[i].question.answer.id,
            };
            axios.post("http://127.0.0.1:8000/api/answer/", obj).then((res) => {
              console.log(res.data);
            });
          } else {
            let obj = {
              question: card.questions[i].question.id,
              answer: card.questions[i].question.answer,
              user: userId,
              option: "",
            };
            axios.post("http://127.0.0.1:8000/api/answer/", obj).then((res) => {
              console.log(res.data);
            });
          }
        }
      }
    }

    const newIndex = isFirstSlide
      ? currentIndex
      : required
      ? currentIndex - 1
      : currentIndex;
    setCurrentIndex(newIndex);
  };

  const getCardDetails = (aid, cid) => {
    setCard([]);
    setRequiredFlag([]);
    setErrorMessage([]);
    axios
      .get(`http://127.0.0.1:8000/api/activity/${aid}/card/${cid}/`)
      .then((res) => {
        const response = res.data;
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
          if (respons[i].question.is_required === true) {
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
    let len = activity.cards.length;
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
        // console.log(card.questions[i]);
        if ("answer" in card.questions[i].question) {
          if (card.questions[i].question.q_type === "RADIO") {
            let obj = {
              question: card.questions[i].question.id,
              answer: "",
              user: userId,
              option: card.questions[i].question.answer.id,
            };
            axios.post("http://127.0.0.1:8000/api/answer/", obj).then((res) => {
              console.log(res.data);
            });
          } else {
            let obj = {
              question: card.questions[i].question.id,
              answer: card.questions[i].question.answer,
              user: userId,
              option: "",
            };
            axios.post("http://127.0.0.1:8000/api/answer/", obj).then((res) => {
              console.log(res.data);
            });
          }
        }
      }
      console.log("HELLO" + required);
    }
    const newIndex = isLastSlide
      ? currentIndex
      : required
      ? currentIndex + 1
      : currentIndex;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/recentactivity/${userId}/`)
      .then((res) => {
        let response = res.data;
        console.log(res.data);
        setActivity(response);
        if (res.data.cards.length != 0) {
          setCurrentIndex(0);
        }
      });
  }, []);

  useEffect(() => {
    if (activity.length != 0) {
      if (currentIndex < activity.cards.length) {
        getCardDetails(activity.id, activity.cards[currentIndex]);
      }
    }
  }, [currentIndex]);
  return (
    <div className="cards flex w-[40vw] mt-[3vh] ml-[3vw] ">
      <button onClick={(e) => previousCard(e)} className="w-[10%]">
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
              ? "black"
              : "gray"
          }
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>{" "}
        {/* make stroke color gray if going to previous is disabled! */}
      </button>
      <ul className="flex flex-col">
        {card.questions &&
          card.questions.map((val, index) => (
            <li className="none h-full w-[50vw]" key={index}>
              {val.question.q_type === "TEXT" ||
              val.question.q_type === "SHORT_ANSWER" ? (
                // <RenderTextArea desc={val.question.q_desc} question={val} textAnswer={textAnswer} setTestAnswer={setTestAnswer}/>
                <div className="w-full flex flex-col flex-grow flex-shrink-0 basis-full mb-2 p-2 border border-primary2 rounded-lg hover:border-[2px] [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label className="mb-2" htmlFor={val.question.desc}>
                    {" "}
                    {val.question.q_text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`box-border break-words outline-none ${
                      val.question.q_type === "SHORT_ANSWER" ? "" : "w-1/2"
                    } py-2 text-sm bg-transparent rounded-sm border-b-2 border-b-primary/70 focus:border-b-[2.5px] focus:border-b-blue-500 ease-in overflow-scroll`}
                    // onBlur={() => monitorEmptyText(required)}
                    // value={textAnswer.answer != null ? textAnswer.answer : ""}
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
                    <span className="text-red">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              ) : val.question.q_type === "RADIO" ||
                val.question.q_type === "MULTIPLE_CHOICE" ? (
                // <RenderRadioButton
                //   desc={val.question.q_desc}
                //   question={val.question.q_text}
                //   options={radioOptions[index]}
                // />
                <div className="w-full flex flex-col flex-grow flex-shrink-0 basis-full mb-2 p-2 border border-primary2 rounded-lg hover:border-[2px] [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label htmlFor={val.question.q_desc}>
                    {" "}
                    {val.question.q_text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  {val.question.options.map((value, index) => (
                    <div className="" key={index}>
                      <input
                        className="before:content[''] peer relative w-3 h-3 mr-2 cursor-pointer appearance-none rounded-full border border-blue-200 border-5 hover:bg-primary/70 focus:bg-tertiary checked:bg-tertiary active:bg-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4  before:transition-opacity  hover:before:opacity-5"
                        type="radio"
                        name={val.question.q_desc}
                        // value={value}
                        // onChange={(e) =>
                        //   handleRenderRadioButtonCLick(val, value)
                        // }
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

                      <label htmlFor={`radio-${index}`}> {value.value} </label>
                    </div>
                  ))}
                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-red">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span> </span>
                  )}
                </div>
              ) : val.question.q_type === "EMAIL" ? (
                // <RenderEmailArea
                //   desc={val.question.q_desc}
                //   question={val.question.q_text}
                //   options={radioOptions[index]}
                // />
                <div className="w-full flex flex-col flex-grow flex-shrink-0 basis-full mb-2 p-2 border border-primary2 rounded-lg hover:border-[2px] [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label className="mb-2" htmlFor={val.question.desc}>
                    {" "}
                    {val.question.q_text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  <input
                    type="email"
                    className={`box-border break-words outline-none ${"w-1/2"} py-2 text-sm bg-transparent rounded-sm border-b-2 border-b-primary/70 focus:border-b-[2.5px] focus:border-b-blue-500 ease-in overflow-scroll`}
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
                    // required
                  ></input>
                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-red">
                      {errorMessage[index].message}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              ) : val.question.q_type === "DATE" ? (
                // <RenderDateArea
                //   desc={val.question.q_desc}
                //   question={val.question.q_text}
                //   options={radioOptions[index]}
                // />
                <div className="w-full flex flex-col flex-grow flex-shrink-0 bg-transparent basis-full mb-2 p-2 border border-primary2 rounded-lg hover:border-[2px] [transiton:border-bottom-radius_0.3s_ease-in-out] ">
                  <label className="mb-2" htmlFor={val.question.desc}>
                    {" "}
                    {val.question.q_text}{" "}
                    <span className="text-red-600">
                      {val.question.is_required ? " *" : " "}
                    </span>
                  </label>
                  <input
                    type="date"
                    className={`box-border break-words outline-none w-1/2 py-2 text-sm bg-transparent rounded-sm overflow-scroll`}
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
                    // required
                  ></input>
                  {tempFlag && errorMessage[index].message ? (
                    <span className="text-red">
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
      <button onClick={(e) => nextCard(e)} className="w-[10%]">
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
              ? "black"
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
