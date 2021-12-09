import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const FinalPage = () => {
  const context = useContext(MainContext);

  return (
    <div className="wrapper">
      <div className="content">
        <h2>Спасибо, что прошли наше тестирование</h2>
        <p>
          Результаты можете посмотреть здесь:{" "}
          <a
            href={process.env.PUBLIC_URL + "/results/" + context.result}
            target="_blank"
            rel="noreferrer"
            style={{ color: "red" }}
          >
            <strong>ССЫЛКА НА ТЕСТ</strong>
          </a>
        </p>
      </div>
    </div>
  );
};
