import { createContext } from "react";

const noop = () => {};

export const MainContext = createContext({
  user: {
    fio: "",
    email: "",
    tel: "",
  },
  result: "",
  authenticated: true,
  final: false,
  setFinal: noop,
  setAuthenticated: noop,
  setUser: noop,
  setResult: noop,
});
