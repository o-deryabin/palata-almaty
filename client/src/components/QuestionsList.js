import React from "react";
import Form from "react-bootstrap/Form";

export const QuestionsList = ({ questions, answers, setAnswers }) => {
  const answerHandler = (event) => {
    // Проверям отвечали ли на этот вопрос
    const similarQuestion = answers.findIndex(
      (item) => item.index === event.target.dataset.index
    );

    // Достаем нужный ответ из массива вопросов
    const answer = questions[event.target.dataset.index].answers.filter(
      (i) => i.value === event.target.value
    );

    console.log(answer);

    // Если на этот вопрос уже отвечали перезаписываем его
    if (similarQuestion !== -1) {
      answers[similarQuestion].answer = event.target.value;
      answers[similarQuestion].t = answer[0].t;
      console.log(answers);
      return;
    }

    // Добавляем новый ответ в массив ответов
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
