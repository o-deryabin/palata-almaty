import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Пожалуйста подождите...</span>
      </Spinner>
    </div>
  );
};
