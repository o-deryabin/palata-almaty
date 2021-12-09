import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { FinalPage } from "./pages/FinalPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ResulPage } from "./pages/ResultPage";

export const useRoutes = (isAuthenticated, final) => {
  if (final) {
    return (
      <Switch>
        <Route path="/final" exact>
          <FinalPage />
        </Route>
        <Route path="/Rn2SnQcps0vWurm" exact>
          <ResulPage />
        </Route>
        <Redirect to="/final" />
      </Switch>
    );
  }

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/Rn2SnQcps0vWurm" exact>
          <ResulPage />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/Rn2SnQcps0vWurm" exact>
        <ResulPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
