import React from "react";
import Form from "react-bootstrap/Form";

export const QuestionsList = ({ questions, answers, setAnswers }) => {
  const answerHandler = (event) => {
    console.log(event);

    const similarQuestion = answers.findIndex(
      (item) => item.index === event.target.dataset.index
    );

    const answer = questions[event.target.dataset.index].answers.filter(
      (i) => i.value === event.target.value
    );

    console.log(answer);

    if (similarQuestion !== -1) {
      answers[similarQuestion].value = event.target.value;
      answers[similarQuestion].t = answer[0].t;
      return;
    }

    setAnswers([
      ...answers,
      {
        question: event.target.name,
        answer: event.target.value,
        index: event.target.dataset.index,
        t: answer[0].t,
      },
    ]);

    console.log(answers);
  };

  const answersList = (answers) =>
    answers.map((item, i) => (
      <option key={i} value={item.value}>
        {item.value}
      </option>
    ));

  const questionsList = questions.map(({ question, answers }, i) => (
    <Form.Group key={i} className="mt-5">
      <Form.Label>
        <h4>
          {i + 1}. {question}
        </h4>
      </Form.Label>
      <Form.Select
        name={question}
        defaultValue={answers[0].value}
        onChange={answerHandler}
        data-index={i}
      >
        {answersList(answers)}
      </Form.Select>
    </Form.Group>
  ));

  return <div className="questions">{questionsList}</div>;
};
