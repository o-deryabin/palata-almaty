import React, { useContext, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import { MainContext } from "../context/MainContext";

export const LoginPage = () => {
  // const { user, setUser } = useUser();
  const context = useContext(MainContext);
  const [toastText, setToastText] = useState("");
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  //validate state
  const [validated, setValidated] = useState(false);

  const changeHandler = (event) => {
    context.setUser({
      ...context.user,
      [event.target.name]: event.target.value,
    });
  };

  // Отправка данных пользователя на сервер и редирект на страницу тестирования
  const sendForm = async (event) => {
    try {
      event.preventDefault();
      const formButton = event.currentTarget;

      if (formButton.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
      }

      const res = await axios.post("/api/question/check", {
        user: context.user,
      });

      if ((res.status = 200)) {
        setValidated(true);

        context.setAuthenticated(false);

        return;
      }
    } catch (e) {
      console.error(e);

      setToastText(e.response.data.message);
      toggleShowA();
    }
  };
  return (
    <div className="wrapper">
      <div className="content">
        <h1 className="mb-5">Введите данные для обратной связи</h1>

        <Form noValidate validated={validated} onSubmit={sendForm}>
          <FloatingLabel
            controlId="floatingFio"
            label="ФИО"
            className="mb-3 section__input"
          >
            <Form.Control
              type="text"
              placeholder="ФИО"
              name="fio"
              value={context.user.fio}
              onChange={changeHandler}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3 section__input"
          >
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={context.user.email}
              onChange={changeHandler}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTel"
            label="Номер телефона"
            className="section__input"
          >
            <Form.Control
              type="text"
              placeholder="Номер талефона"
              name="tel"
              required
              value={context.user.tel}
              onChange={changeHandler}
            />
          </FloatingLabel>
          <Button type="submit" variant="primary" className="mt-5">
            Начать тест
          </Button>
        </Form>
      </div>
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <strong className="me-auto">Палата Алматы</strong>
        </Toast.Header>
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
    </div>
  );
};
