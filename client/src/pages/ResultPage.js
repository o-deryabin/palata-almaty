import React, { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Loader } from "../components/Loader";

export const ResulPage = () => {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [showA, setShowA] = useState(false);
  const [toastText, setToastText] = useState("");

  const toggleShowA = () => setShowA(!showA);

  const changeHandler = (event) => {
    setPassword(event.target.value);
  };

  const getUsers = useCallback(async () => {
    try {
      setLoader(true);

      const res = await axios.post("/api/question/results", {
        password: password,
      });

      setUsers(res.data);
      console.log(users, res.data);

      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);

      setToastText(e.response.data.message);
      toggleShowA();
    }
  }, [password, toggleShowA, users]);

  const passwordLabel = () => {
    return (
      <Form onSubmit={getUsers}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Пароль"
            onChange={changeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
    );
  };

  const listLabel = () =>
    users.map((item, i) => (
      <Card key={i} className="my-5">
        <Card.Body>
          <strong>ФИО: </strong>
          {item.fio}
          <br />
          <strong>Email: </strong>
          {item.email}
          <br />
          <strong>Телефон: </strong>
          {item.tel}
          <br />
          <strong>Время: </strong>
          {item.time}
          <br />

          <a
            href={process.env.PUBLIC_URL + "/results/" + item.email}
            target="_blank"
            rel="noreferrer"
          >
            <strong>Ссылка на тест</strong>
          </a>
        </Card.Body>
      </Card>
    ));

  if (loader) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container">
        {users.length ? listLabel() : passwordLabel()}
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
