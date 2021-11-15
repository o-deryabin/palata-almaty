import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainContext } from "./context/MainContext";
import { useTimer } from "./hooks/timer.hook";
import { useUser } from "./hooks/user.hook";
import { useRoutes } from "./routes";

function App() {
  const { user, authenticated, result, setAuthenticated, setUser, setResult } =
    useUser();

  const { final, setFinal } = useTimer();

  const routes = useRoutes(authenticated, final);

  return (
    <div className="App">
      <MainContext.Provider
        value={{
          user,
          authenticated,
          setAuthenticated,
          setUser,
          setFinal,
          final,
          result,
          setResult,
        }}
      >
        <Router>{routes}</Router>
      </MainContext.Provider>
    </div>
  );
}

export default App;
