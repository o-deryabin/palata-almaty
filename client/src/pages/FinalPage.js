import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const FinalPage = () => {
  const context = useContext(MainContext);

  return (
    <div className="wrapper">
      <div className="content">
        <h2>Спасибо, что прошли наше тестирование</h2>
        <p>Результаты можете посмотреть на почте: {context.user.email}</p>
      </div>
    </div>
  );
};
