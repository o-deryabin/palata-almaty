import React, { useContext, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { MainContext } from "../context/MainContext";

export const LoginPage = () => {
  // const { user, setUser } = useUser();
  const context = useContext(MainContext);

  //validate state
  const [validated, setValidated] = useState(false);

  const changeHandler = (event) => {
    context.setUser({
      ...context.user,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = (event) => {
    try {
      event.preventDefault();
      const formButton = event.currentTarget;

      if (formButton.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
      }

      setValidated(true);

      context.setAuthenticated(false);
    } catch (e) {
      console.log(e);
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
    </div>
  );
};
