import React, { useState, useContext, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { QuestionsList } from "../components/QuestionsList";
import { useTimer } from "../hooks/timer.hook";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { Loader } from "../components/Loader";

export const MainPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loader, setLoader] = useState(true);

  const { seconds, minutes } = useTimer();

  const context = useContext(MainContext);

  const getQuestions = useCallback(async () => {
    try {
      const res = await axios.get("/api/question/");

      setQuestions(res.data);

      setLoader(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const sendAnswers = async () => {
    answers.sort((a, b) => {
      return a.index - b.index;
    });

    const { data } = await axios.post("/api/question/send", {
      answers: [...answers],
      user: { ...context.user },
    });

    console.log(data);

    context.setResult(data.path);

    context.setFinal(true);
  };

  const time = () => {
    if (seconds < 10 && minutes < 10) {
      return `0${minutes}:0${seconds}`;
    }

    if (minutes < 10) {
      return `0${minutes}:${seconds}`;
    }

    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="main">
      <Container>
        <div className="time">
          <h4>Оставшееся время {time()}</h4>
        </div>
        <QuestionsList
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          className="mt-5"
        />
        <Button variant="primary" onClick={sendAnswers} className="mt-5 mb-5">
          Отправить
        </Button>
      </Container>
    </div>
  );
};
